import axios from "axios";

import {Database} from "./database-api";
import {
  Document,
  DocumentWithData,
  Note,
  Predicate,
  PredicateEditType,
} from "./model";
import {
  getCoreCodelistItem,
  getCoreLabel,
  getCorePredicate,
} from "./predefined";

const RDFS_PROPERTY = "http://www.w3.org/2000/01/rdf-schema#Property";

const RDFS_HAS_DOMAIN = "http://www.w3.org/2000/01/rdf-schema#domain";

const RDFS_HAS_IN_SCHEME = "http://www.w3.org/2004/02/skos/core#inScheme";

class InMemoryDatabase implements Database {

  private fetched = false;

  private documents: DocumentWithData[] = [];

  async getDocuments(): Promise<Document[]> {
    await this.fetchDatabaseFile();
    return this.documents;
  }

  private async fetchDatabaseFile(): Promise<void> {
    if (this.fetched) {
      return;
    }
    const response = await axios.get("api/v1/documents-file");
    this.documents = response.data.documents;
  }

  async getDocument(iri: string): Promise<DocumentWithData | undefined> {
    await this.fetchDatabaseFile();
    for (const document of this.documents) {
      if (document.iri === iri) {
        return copyDocument(document);
      }
    }
    return undefined;
  }

  async getPredicates(): Promise<Predicate[]> {
    await this.fetchDatabaseFile();
    const result = [...getCorePredicate()];
    for (const document of this.documents) {
      if (document.types.includes(RDFS_PROPERTY)) {
        result.push(documentToPredicate(document));
      }
    }
    return result;
  }

  async getPredicate(iri: string): Promise<Predicate | undefined> {
    const predicates = await this.getPredicates();
    for (const predicate of predicates) {
      if (predicate.iri === iri) {
        return predicate;
      }
    }
    return undefined;
  }

  async getCodelist(types: string[]): Promise<string[]> {
    await this.fetchDatabaseFile();
    const result: Set<string> = new Set();
    // Add core items.
    for (const type of types) {
      for (const item of getCoreCodelistItem(type)) {
        result.add(item);
      }
    }
    // Add documents of required type.
    for (const document of this.documents) {
      const inSchema = document.properties[RDFS_HAS_IN_SCHEME] || [];
      if (isIntersecting(inSchema, types)) {
        result.add(document.iri);
      }
    }
    return [...result];
  }

  async storeDocument(document: DocumentWithData): Promise<void> {
    const index = find(this.documents, document.iri);
    if (index === undefined) {
      this.documents.push(document);
    } else {
      this.documents[index] = document;
    }
    await this.postDocuments();
  }

  private async postDocuments(): Promise<void> {
    axios.post("api/v1/documents-file", {
      "documents": this.documents,
    });
  }

  async deleteDocument(iri: string): Promise<void> {
    const index = find(this.documents, iri);
    if (index === undefined) {
      return;
    }
    this.documents = [
      ...this.documents.slice(0, index),
      ...this.documents.slice(index + 1),
    ];
    await this.postDocuments();
  }

  async getLabel(iri: string): Promise<string> {
    const label = getCoreLabel(iri);
    if (label !== undefined) {
      return label;
    }
    for (const document of this.documents) {
      if (document.iri === iri) {
        return document.title;
      }
    }
    return iri;
  }

}

function isIntersecting(left: string[], right: string[]): boolean {
  for (const leftItem of left) {
    if (right.includes(leftItem)) {
      return true;
    }
  }
  return false;
}

function documentToPredicate(document: Document) : Predicate {
  const codelist = document.properties[RDFS_HAS_DOMAIN];
  return {
    "iri": document.iri,
    "label": document.title,
    "multiple": true,
    "type": codelist === undefined ?
      PredicateEditType.String : PredicateEditType.Codelist,
    "codelist": codelist || [],
    "domain": undefined,
  };
}

function find(document: Document[], iri: string): number | undefined {
  for (let index = 0; index < document.length; ++index) {
    if (document[index].iri == iri) {
      return index;
    }
  }
  return undefined;
}

function copyDocument(source: DocumentWithData): DocumentWithData {
  return {
    ...source,
    "types": [...source.types],
    "items": copyItems(source.items),
    "properties": copyProperties(source.properties),
  };
}

function copyItems(notes: Note[]): Note[] {
  const result: Note[] = [];
  for (const note of notes) {
    result.push({
      ...note,
      "types": [...note.types],
      "properties": copyProperties(note.properties),
    });
  }
  return result;
}

function copyProperties(
  properties: Record<string, string[]>,
): Record<string, string[]> {
  const result: Record<string, string[]> = {};
  for (const [key, values] of Object.entries(properties)) {
    result[key] = [...values];
  }
  return result;
}

export function createInMemoryDatabase(): Database {
  return new InMemoryDatabase();
}

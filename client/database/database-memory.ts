import axios from "axios";

import {Database} from "./database-api";
import {Codelist, Document, DocumentWithData, Note, Predicate} from "./model";
import {getCoreCodelistItem, getCorePredicate} from "./predefined";

class InMemoryDatabase implements Database {

  private fetched = false;

  private documents: DocumentWithData[] = [];

  private predicates: Predicate[] = [...getCorePredicate()];

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
    return this.predicates;
  }

  async getPredicate(iri: string): Promise<Predicate | undefined> {
    await this.fetchDatabaseFile();
    for (const predicate of this.predicates) {
      if (predicate.iri === iri) {
        return predicate;
      }
    }
    return undefined;
  }

  async getCodelist(types: string[]): Promise<Codelist[]> {
    await this.fetchDatabaseFile();
    const result: Record<string, Codelist> = {};
    // Add core items.
    for (const type of types) {
      for (const item of getCoreCodelistItem(type)) {
        result[item.iri] = item;
      }
    }
    // Add Documents.
    for (const Document of this.documents) {
      if (isOfType(Document, types)) {
        result[Document.iri] = Document;
      }
    }
    return Object.values(result);
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

}

function isOfType(document: Document, types: string[]): boolean {
  for (const type of document.types) {
    if (types.includes(type.iri)) {
      return true;
    }
  }
  return false;
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

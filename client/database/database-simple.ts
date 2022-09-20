import axios from "axios";

import {Database} from "./database-api";
import {
  Document,
  DocumentWithData,
  Predicate,
  PredicateEditType,
} from "./model";
import {
  getCoreCodelistItem,
  getCoreLabel,
  getCorePredicate,
} from "./predefined";

const RDFS_PROPERTY =
  "http://www.w3.org/2000/01/rdf-schema#Property";

const RDFS_HAS_DOMAIN =
  "http://www.w3.org/2000/01/rdf-schema#domain";

const RDFS_HAS_IN_SCHEME =
  "http://www.w3.org/2004/02/skos/core#inScheme";

const LIST_COLOR =
  "https://skodapetr.github.io/knoma/vocabulary#listColor";

const LIST_PRIORITY =
  "https://skodapetr.github.io/knoma/vocabulary#listPriority";

/**
 * Use API to fetch list of documents and work with documents. The list of
 * documents (index) is fetched on the client side.
 */
class FileDatabase implements Database {

  documents: Document[] = [];

  documentsAreDirty  = true;

  async getDocuments(): Promise<Document[]> {
    await this.refreshDocuments();
    return this.documents;
  }

  /**
   * Update documents from server if needed.
   */
  private async refreshDocuments() {
    if (this.documentsAreDirty) {
      const response = await axios.get("api/v1/documents");
      this.documents = response.data;
      this.documentsAreDirty = false;
    }
  }

  async getDocument(iri: string): Promise<DocumentWithData | undefined> {
    const url = "api/v1/documents?iri=" + encodeURIComponent(iri);
    const response = await axios.get(url);
    return response.data;
  }

  async getPredicates(): Promise<Predicate[]> {
    await this.refreshDocuments();
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
    await this.refreshDocuments();
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
      // We can add items if they are of given class or are part of a codelist.
      if (isIntersecting(inSchema, types)) {
        result.add(document.iri);

      } else  if (isIntersecting(document.types, types)) {
        result.add(document.iri);
      }
    }
    return [...result];
  }

  async storeDocument(document: DocumentWithData): Promise<void> {
    const url = "api/v1/documents?iri=" + encodeURIComponent(document.iri);
    await axios.post(url, document);
    this.documentsAreDirty = true;
  }

  async deleteDocument(iri: string): Promise<void> {
    const url = "api/v1/documents?iri=" + encodeURIComponent(iri);
    await axios.delete(url);
    this.documentsAreDirty = true;
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

function documentToPredicate(document: Document): Predicate {
  const codelist = document.properties[RDFS_HAS_DOMAIN];
  const listColour = document.properties[LIST_COLOR];
  const listPriority = document.properties[LIST_PRIORITY];
  return {
    "iri": document.iri,
    "label": document.title,
    "multiple": true,
    "type": codelist === undefined ?
      PredicateEditType.String : PredicateEditType.Codelist,
    "codelist": codelist || [],
    "domain": undefined,
    "listColour" : listColour?.[0],
    "listPriority": parseInt(listPriority?.[0] ?? "0"),
  };
}

export function createFileDatabase(): Database {
  return new FileDatabase();
}

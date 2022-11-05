import {Database} from "./database-api";
import {Document, DocumentWithData} from "./model";
import {SimpleDatabase} from "./database-simple";

const LIST_IDENTIFIER = "documents-list";

/**
 * Client side implementation of database using localStorage. This
 * is limited in size.
 */
class LocalStorageDatabase extends SimpleDatabase implements Database {

  getDatabaseLabel(): string {
    return "Local Storage";
  }

  async deleteDocument(iri: string): Promise<void> {
    localStorage.removeItem(iri);
    // Update documents.
    const index = this.findDocument(iri);
    if (index === undefined) {
      return;
    }
    this.documents.splice(index, 1);
    this.saveDocuments();
  }

  protected findDocument(iri: string): number | undefined {
    for (let index = 0; index < this.documents.length; ++index) {
      const document = this.documents[index];
      if (document.iri === iri) {
        return index;
      }
    }
    return undefined;
  }

  protected saveDocuments(): void {
    const content = JSON.stringify(this.documents);
    localStorage.setItem(LIST_IDENTIFIER, content);
  }

  async getDocument(iri: string): Promise<DocumentWithData | undefined> {
    const contentAsString = localStorage.getItem(iri);
    if (contentAsString === null) {
      return undefined;
    }
    return JSON.parse(contentAsString) as DocumentWithData;
  }

  protected async refreshDocuments(): Promise<void> {
    // We only load data for the first time, else we have
    // actual version in memory.
    if (this.documents.length > 0) {
      return;
    }
    const contentAsString = localStorage.getItem(LIST_IDENTIFIER);
    if (contentAsString === null) {
      return;
    }
    this.documents = JSON.parse(contentAsString) as Document[];
  }

  async storeDocument(document: DocumentWithData): Promise<void> {
    const content = JSON.stringify(document);
    localStorage.setItem(document.iri, content);
    // Update documents.
    const newDocument: Document = {
      "iri": document.iri,
      "types": document.types,
      "title": document.title,
      "description": document.description,
      "created": document.created,
      "properties": document.properties,
    };
    const index = this.findDocument(document.iri);
    if (index === undefined) {
      this.documents = [newDocument, ...this.documents];
    } else {
      this.documents[index] = newDocument;
    }
    this.saveDocuments();
  }

}

export function createLocalStorageDatabase(): Database {
  const result = new LocalStorageDatabase();
  if (isFirstLoad()) {
    addDemoContent(result);
  }
  return result;
}

function isFirstLoad(): boolean {
  return localStorage.getItem(LIST_IDENTIFIER) === null;
}

function addDemoContent(database: LocalStorageDatabase) {
  const now = new Date().toISOString().substr(0, 10);
  database.storeDocument({
    "iri": "http://example.com/note/001",
    "created": now,
    "title": "Click me!",
    "description": "Welcome to Knowledge Manager.",
    "types": [],
    "properties": {
      "https://skodapetr.github.io/knoma/vocabulary#author": [
        "Petr Škoda"
      ]
    },
    "items": [
      {
        "identifier": "001",
        "properties": {},
        "created": now,
        "text": "There might be a tutorial one day ... ",
        "image": undefined,
      },
      {
        "identifier": "002",
        "properties": {},
        "created": now,
        "text": "This instance is using your local storage to store data.",
        "image": undefined,
      },
    ],
  });
}

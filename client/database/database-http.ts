import {Database} from "./database-api";
import axios from "axios";
import {SimpleDatabase} from "./database-simple";
import {DocumentWithData} from "./model";

/**
 * Use API to fetch list of documents and work with documents. The list of
 * documents (index) is fetched on the client side.
 */
class HttpDatabase extends SimpleDatabase implements Database {

  protected documentsAreDirty  = true;

  getDatabaseLabel(): string {
    return "HTTP Based";
  }

  protected async refreshDocuments() {
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

}

export function createHttpDatabase(): Database {
  return new HttpDatabase();
}

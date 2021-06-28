import {Document, getDatabase} from "../database";

export class DocumentFilters {

  search = "";

}

export class FilteredDocumentSource {

  documents: Document[] = [];

  filters: DocumentFilters = new DocumentFilters();

  async refresh(): Promise<void> {
    const database = getDatabase();
    const documents = await database.getDocuments();
    this.documents = documents.filter(doc => this.filterDocument(doc));
  }

  private filterDocument(document: Document): boolean {
    return this.filterBySearch(document);
  }

  private filterBySearch(document: Document): boolean {
    // Check that we have filter value set.
    const search = this.filters.search;
    if (search === undefined || search == null || search.length < 2) {
      return true;
    }
    // Use lowercase match as a filter.
    const title = document.title.toLowerCase();
    if (!title.includes(search.toLowerCase())) {
      return false;
    }
    return true;
  }

}

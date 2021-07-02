import {Document, getDatabase} from "../database";

export interface TypeFilter {

  iri: string;

  include: boolean;

}

export class DocumentFilters {

  search = "";

  types: TypeFilter[] = [];

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
    return this.filterBySearch(document)
      && this.filterByType(document);
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

  private filterByType(document: Document): boolean {
    const filterTypes = this.filters.types;
    if (filterTypes.length === 0) {
      return true;
    }
    const documentTypes = document.types;
    for (const type of filterTypes) {
      const documentIncludeType = documentTypes.includes(type.iri);
      if (documentIncludeType === type.include) {
        continue;
      }
      return false;
    }
    return true;
  }

}

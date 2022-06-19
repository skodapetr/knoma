import {Document, getDatabase} from "../database";

export interface TypeFilter {

  iri: string;

  include: boolean;

}

export type PropertyFilters = { [iri: string]: string[] };

export class DocumentFilters {

  search = "";

  types: TypeFilter[] = [];

  properties: PropertyFilters = {};

}

export class FilteredDocumentSource {

  documents: Document[] = [];

  visibleDocuments: Document[] = [];

  filters: DocumentFilters = new DocumentFilters();

  visibleLimit: number = 12;

  async refresh(): Promise<void> {
    const database = getDatabase();
    const documents = await database.getDocuments();
    this.documents = documents.filter(doc => this.filterDocument(doc));
    this.visibleDocuments = this.documents.slice(0, this.visibleLimit);
  }

  private filterDocument(document: Document): boolean {
    return this.filterBySearch(document)
      && this.filterByType(document)
      && this.filterByProperties(document);
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

  private filterByProperties(document: Document): boolean {
    for (const [iri, filterValues] of Object.entries(this.filters.properties)) {
      const documentValues = document.properties[iri];
      if (documentValues === undefined) {
        return false;
      }
      // If no values are provided just check that there is a value.
      for (const filterValue of filterValues) {
        if (filterValue === "") {
          continue;
        }
        if (documentValues.includes(filterValue)) {
          continue;
        }
        return false;
      }
    }
    return true;
  }

  showMore() {
    this.visibleLimit += 12;
    this.visibleDocuments = this.documents.slice(0, this.visibleLimit);
  }

}

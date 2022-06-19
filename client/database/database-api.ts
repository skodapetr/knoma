import {Document, DocumentWithData, Predicate} from "./model";

export interface Database {

  /**
   * Return all user created documents.
   */
  getDocuments(): Promise<Document[]>;

  /**
   * Return document with given IRI if it exists.
   */
  getDocument(iri: string): Promise<DocumentWithData | undefined>;

  /**
   * Return all predicates, this includes user created and predefined
   * predicates as well.
   */
  getPredicates(): Promise<Predicate[]>;

  /**
   * Return predicate with given IRI.
   */
  getPredicate(iri: string): Promise<Predicate | undefined>;

  /**
   * For given list of codelists, identified by IRI, return all possible
   * values defined as unions of the codelists.
   */
  getCodelist(types: string[]): Promise<string[]>;

  /**
   * Store given document.
   */
  storeDocument(document: DocumentWithData): Promise<void>;

  /**
   * Delete document with given IRI.
   */
  deleteDocument(iri: string): Promise<void>;

  /**
   * Label for given IRI.
   */
  getLabel(iri: string): Promise<string>;

}

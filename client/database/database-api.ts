import {Codelist, Document, DocumentWithData, Predicate} from "./model";

export interface Database {

  getDocuments(): Promise<Document[]>;

  getDocument(iri: string): Promise<DocumentWithData | undefined>;

  getPredicates(): Promise<Predicate[]>;

  getPredicate(iri: string): Promise<Predicate | undefined>;

  getCodelist(types: string[]): Promise<Codelist[]>;

  storeDocument(document: DocumentWithData): Promise<void>;

  deleteDocument(iri:string): Promise<void>;

}

export interface Document {

  iri: string;

  types: string[];

  title: string;

  description: string;

  created: string;

  properties: { [iri: string]: string[] },

}

export interface DocumentWithData extends Document {

  items: Note[];

}

export interface Note {

  iri: string;

  types: string[];

  properties: { [iri: string]: string[] },

  created: string;

  text: string;

  image: string | undefined;

}

/**
 * Can be used to connect properties to documents and notes.
 */
export interface Predicate {

  iri: string;

  label: string;

  /**
   * Allow multiple values.
   */
  multiple: boolean;

  /**
   * Edit component type.
   */
  type: PredicateEditType;

  /**
   * Codelist to use to get values from.
   */
  codelist: string[] | undefined;

  /**
   * May limit classes required to allow for predicate search. Set to undefined
   * to apply no limitation.
   */
  domain: string[] | undefined;

}

export enum PredicateEditType {
  String = "string",
  Date = "date",
  Codelist = "codelist",
}

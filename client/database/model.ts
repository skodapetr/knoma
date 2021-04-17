export interface Codelist {

  iri: string;

  title: string;

}

export interface Document {

  iri: string;

  types: Codelist[];

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

  types: Codelist[];

  properties: { [iri: string]: string[] },

  text: string;

  image: string | undefined;

}

/**
 * Can be used to connect properties to entities.
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

}

export enum PredicateEditType {
  String = "string",
  Date = "date",
  Codelist = "codelist",
}

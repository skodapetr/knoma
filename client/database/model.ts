/**
 * Document represents unit of user interaction. Like a collection
 * of papers that one would employ to take notes on a particular topic.
 *
 * This is used mostly as a document reference.
 */
export interface Document {

  iri: string;

  types: string[];

  title: string;

  description: string;

  created: string;

  properties: { [iri: string]: string[] },

}

/**
 * Document may contain notes.
 */
export interface DocumentWithData extends Document {

  items: Note[];

}

/**
 * A piece of information user add to a document. Represent a note,
 * one would put on a paper.
 */
export interface Note {

  /**
   * Relative identifier.
   */
  identifier: string;

  types: string[];

  properties: { [iri: string]: string[] },

  created: string;

  text: string;

  image: string | undefined;

}

/**
 * Can be used to connect properties to documents and notes. Predicate
 * can be predefined or be a document with proper types.
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
   * May limit classes required to allow for predicate search.
   * If undefined there are no limitations.
   */
  domain: string[] | undefined;

  /**
   * If set values are shown as tags in list with given color
   * */
  listColour: string | undefined;

  /**
   * Higher number mean higher position in the tag list.
   * */
  listPriority: number | undefined;

}

/**
 * Codelist of predicate edit types, those determine input type.
 */
export enum PredicateEditType {
  String = "string",
  Date = "date",
  Codelist = "codelist",
}

import {Predicate, PredicateEditType} from "./model";

/**
 * Represent a quote of the source material.
 */
export const QUOTE =
  "https://skodapetr.github.io/knoma/vocabulary#Quote";

/**
 * Represent a template new documents can be created from.
 */
export const DOCUMENT_TEMPLATE =
  "https://skodapetr.github.io/knoma/vocabulary#Template";

/**
 * Represent a quick note.
 */
export const DOCUMENT_NOTE =
  "https://skodapetr.github.io/knoma/vocabulary#QuickNote";

/**
 * Represent a note inside a document.
 * This is not stored, we use it only to select properties for notes.
 */
export const NOTE = "https://skodapetr.github.io/knoma/vocabulary#Note";

export const TEMPLATE_EMPTY =
  "https://skodapetr.github.io/knoma/resources/empty-template";

export const NOTE_TEMPLATE =
  "https://skodapetr.github.io/knoma/resources/quick-note-template";

const LABELS: { [iri: string]: string } = {
  "http://www.w3.org/2004/02/skos/core#ConceptScheme": "Concept Scheme",
  "http://www.w3.org/2004/02/skos/core#Concept": "Concept",
  "http://www.w3.org/2000/01/rdf-schema#Property": "Property",
  "http://www.w3.org/2000/01/rdf-schema#Class": "Class",
  [DOCUMENT_TEMPLATE]: "Template",
  [DOCUMENT_NOTE]: "Quick note",
};

const CODE_LISTS: { [type: string]: string[] } = {
  "http://www.w3.org/2000/01/rdf-schema#Class": [
    "http://www.w3.org/2004/02/skos/core#ConceptScheme",
    "http://www.w3.org/2004/02/skos/core#Concept",
    "http://www.w3.org/2000/01/rdf-schema#Property",
    "http://www.w3.org/2000/01/rdf-schema#Class",
    DOCUMENT_TEMPLATE,
    DOCUMENT_NOTE,
  ],
};

const PREDICATES: Predicate[] = [
  {
    "iri": "http://www.w3.org/2004/02/skos/core#inScheme",
    "label": "In scheme",
    "multiple": true,
    "type": PredicateEditType.Codelist,
    "codelist": [
      "http://www.w3.org/2004/02/skos/core#ConceptScheme",
    ],
    "domain": [
      "http://www.w3.org/2004/02/skos/core#Concept",
    ],
    "listColour" : undefined,
    "listPriority": undefined,
  }, {
    "iri": "https://skodapetr.github.io/knoma/vocabulary#url",
    "label": "URL",
    "multiple": false,
    "type": PredicateEditType.String,
    "codelist": undefined,
    "domain": undefined,
    "listColour" : undefined,
    "listPriority": undefined,
  }, {
    "iri": "https://skodapetr.github.io/knoma/vocabulary#doi",
    "label": "DOI",
    "multiple": false,
    "type": PredicateEditType.String,
    "codelist": undefined,
    "domain": undefined,
    "listColour" : undefined,
    "listPriority": undefined,
  }, {
    "iri": "https://skodapetr.github.io/knoma/vocabulary#author",
    "label": "Author",
    "multiple": false,
    "type": PredicateEditType.String,
    "codelist": undefined,
    "domain": undefined,
    "listColour" : undefined,
    "listPriority": undefined,
  }, {
    "iri": "https://skodapetr.github.io/knoma/vocabulary#published",
    "label": "Published",
    "multiple": false,
    "type": PredicateEditType.Date,
    "codelist": undefined,
    "domain": undefined,
    "listColour" : undefined,
    "listPriority": undefined,
  }, {
    "iri": "http://www.w3.org/2000/01/rdf-schema#domain",
    "label": "Domain",
    "multiple": true,
    "type": PredicateEditType.Codelist,
    "codelist": [
      "http://www.w3.org/2004/02/skos/core#ConceptScheme",
    ],
    "domain": [
      "http://www.w3.org/2000/01/rdf-schema#Property",
    ],
    "listColour" : undefined,
    "listPriority": undefined,
  }, {
    // Used by notes to reference another note or a document.
    "iri": "https://skodapetr.github.io/knoma/vocabulary#ref",
    "label": "Reference",
    "multiple": false,
    "type": PredicateEditType.String,
    "codelist": undefined,
    "domain": undefined,
    "listColour" : undefined,
    "listPriority": undefined,
  }, {
    // If document is a value in a codelist and this values is set,
    // it determines the color the value is shown in the list.
    "iri": "https://skodapetr.github.io/knoma/vocabulary#listColor",
    "label": "List color",
    "multiple": false,
    "type": PredicateEditType.String,
    "codelist": undefined,
    "domain": undefined,
    "listColour" : undefined,
    "listPriority": undefined,
  }, {
    // In addition to listColor user can specify priority. If not set default
    // is zero. This value is used to order tags in the document list.
    "iri": "https://skodapetr.github.io/knoma/vocabulary#listPriority",
    "label": "List priority",
    "multiple": false,
    "type": PredicateEditType.String,
    "codelist": undefined,
    "domain": undefined,
    "listColour" : undefined,
    "listPriority": undefined,
  },
];

(function initialize() {
  copyPredicateLabelsToLabels();
})();

function copyPredicateLabelsToLabels() {
  for (const predicate of PREDICATES) {
    LABELS[predicate.iri] = predicate.label;
  }
}

export function getCoreLabel(type: string): string | undefined {
  return LABELS[type];
}

export function getCoreCodelistItem(type: string): string[] {
  return CODE_LISTS[type] || [];
}

export function getCorePredicate(): Predicate[] {
  return PREDICATES;
}

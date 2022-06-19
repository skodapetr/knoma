import {Predicate, PredicateEditType} from "./model";

const LABELS: { [iri: string]: string } = {
  "http://www.w3.org/2004/02/skos/core#ConceptScheme": "Concept Scheme",
  "http://www.w3.org/2004/02/skos/core#Concept": "Concept",
  "http://www.w3.org/2000/01/rdf-schema#Property": "Property",
  "http://www.w3.org/2000/01/rdf-schema#Class": "Class",
  "https://skodapetr.github.io/knoma/vocabulary#PlainText": "Plain Text",
  "https://skodapetr.github.io/knoma/vocabulary#Markdown": "Markdown",
  "https://skodapetr.github.io/knoma/vocabulary#LaTex": "LaTex",
  "https://skodapetr.github.io/knoma/vocabulary#HTML": "HTML",
};

const CODE_LISTS: { [type: string]: string[] } = {
  "http://www.w3.org/2000/01/rdf-schema#Class": [
    "http://www.w3.org/2004/02/skos/core#ConceptScheme",
    "http://www.w3.org/2004/02/skos/core#Concept",
    "http://www.w3.org/2000/01/rdf-schema#Property",
    "http://www.w3.org/2000/01/rdf-schema#Class",
  ],
  "https://skodapetr.github.io/knoma/vocabulary#ContentType": [
    "https://skodapetr.github.io/knoma/vocabulary#PlainText",
    "https://skodapetr.github.io/knoma/vocabulary#Markdown",
    "https://skodapetr.github.io/knoma/vocabulary#LaTex",
    "https://skodapetr.github.io/knoma/vocabulary#HTML",
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
  }, {
    "iri": "https://skodapetr.github.io/knoma/vocabulary#url",
    "label": "URL",
    "multiple": false,
    "type": PredicateEditType.String,
    "codelist": undefined,
    "domain": undefined,
  }, {
    "iri": "https://skodapetr.github.io/knoma/vocabulary#doi",
    "label": "DOI",
    "multiple": false,
    "type": PredicateEditType.String,
    "codelist": undefined,
    "domain": undefined,
  }, {
    "iri": "https://skodapetr.github.io/knoma/vocabulary#author",
    "label": "Author",
    "multiple": false,
    "type": PredicateEditType.String,
    "codelist": undefined,
    "domain": undefined,
  }, {
    "iri": "https://skodapetr.github.io/knoma/vocabulary#published",
    "label": "Published",
    "multiple": false,
    "type": PredicateEditType.Date,
    "codelist": undefined,
    "domain": undefined,
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
  }, {
    // Used by notes to reference another note or a document.
    "iri": "https://skodapetr.github.io/knoma/vocabulary#ref",
    "label": "Reference",
    "multiple": false,
    "type": PredicateEditType.String,
    "codelist": undefined,
    "domain": undefined,
  }, {
    // If document is a value in a codelist and this values is set,
    // it determines the color the value is shown in the list.
    "iri": "https://skodapetr.github.io/knoma/vocabulary#listColor",
    "label": "List color",
    "multiple": false,
    "type": PredicateEditType.String,
    "codelist": undefined,
    "domain": undefined,
  }, {
    // Used by notes to reference another note or a document.
    "iri": "https://skodapetr.github.io/knoma/vocabulary#contentType",
    "label": "Content type",
    "multiple": false,
    "type": PredicateEditType.Codelist,
    "codelist": [
      "https://skodapetr.github.io/knoma/vocabulary#ContentType",
    ],
    "domain": undefined,
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

import {Predicate, PredicateEditType} from "./model";

const LABELS: { [iri: string]: string } = {
  "http://www.w3.org/2004/02/skos/core#ConceptScheme": "Concept Scheme",
  "http://www.w3.org/2004/02/skos/core#Concept": "Concept",
  "http://www.w3.org/2000/01/rdf-schema#Property": "Property",
};

const CODE_LISTS: { [type: string]: string[] } = {
  "http://www.w3.org/2000/01/rdf-schema#Class": [
    "http://www.w3.org/2004/02/skos/core#ConceptScheme",
    "http://www.w3.org/2004/02/skos/core#Concept",
    "http://www.w3.org/2000/01/rdf-schema#Property",
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
    "iri": "https://knoma.skodapetr.eu/vocabulary#url",
    "label": "URL",
    "multiple": false,
    "type": PredicateEditType.String,
    "codelist": undefined,
    "domain": undefined,
  }, {
    "iri": "https://knoma.skodapetr.eu/vocabulary#doi",
    "label": "DOI",
    "multiple": false,
    "type": PredicateEditType.String,
    "codelist": undefined,
    "domain": undefined,
  }, {
    "iri": "https://knoma.skodapetr.eu/vocabulary#published",
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
    // Used by Notes to reference another note or a document.
    "iri": "https://knoma.skodapetr.eu/vocabulary#ref",
    "label": "Reference",
    "multiple": false,
    "type": PredicateEditType.String,
    "codelist": undefined,
    "domain": undefined,
  },
];

export function getCoreLabel(type: string): string | undefined {
  return LABELS[type];
}

export function getCoreCodelistItem(type: string): string[] {
  return CODE_LISTS[type] || [];
}

export function getCorePredicate(): Predicate[] {
  return PREDICATES;
}

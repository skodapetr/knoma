import {Codelist, Predicate, PredicateEditType} from "./model";

const CODE_LISTS: { [type: string]: Codelist[] } = {
  "http://www.w3.org/2000/01/rdf-schema#Class": [
    {
      // Define concept lists that can be used as values in code lists.
      "iri": "http://www.w3.org/2004/02/skos/core#ConceptScheme",
      "title": "Concept Scheme",
    }, {
      // Predefined codelist instance.
      "iri": "https://knoma.skodapetr.eu/resource/Annotation",
      "title": "Annotation",
    },
  ],
  "http://www.w3.org/2004/02/skos/core#ConceptScheme": [
    {
      // Predefined codelist instance.
      "iri": "https://knoma.skodapetr.eu/resource/Annotation",
      "title": "Annotation",
    },
  ],
};

// https://www.w3.org/TR/skos-reference/#schemes
//
const PREDICATES: Predicate[] = [
  {
    "iri": "http://www.w3.org/2004/02/skos/core#inScheme",
    "label": "In scheme",
    "multiple": true,
    "type": PredicateEditType.Codelist,
    "codelist": [
      "http://www.w3.org/2004/02/skos/core#ConceptScheme",
    ],
  }, {
    "iri": "https://knoma.skodapetr.eu/vocabulary#url",
    "label": "URL",
    "multiple": false,
    "type": PredicateEditType.String,
    "codelist": undefined,
  }, {
    "iri": "https://knoma.skodapetr.eu/vocabulary#doi",
    "label": "DOI",
    "multiple": false,
    "type": PredicateEditType.String,
    "codelist": undefined,
  }, {
    "iri": "https://knoma.skodapetr.eu/vocabulary#published",
    "label": "Published",
    "multiple": false,
    "type": PredicateEditType.Date,
    "codelist": undefined,
  }, {
    "iri": "https://knoma.skodapetr.eu/vocabulary#annotation",
    "label": "Annotation",
    "multiple": true,
    "type": PredicateEditType.Codelist,
    "codelist": [
      "https://knoma.skodapetr.eu/resource/Annotation",
    ],
  },
];

export function getCoreCodelistItem(type: string): Codelist[] {
  return CODE_LISTS[type] || [];
}

export function getCorePredicate(): Predicate[] {
  return PREDICATES;
}

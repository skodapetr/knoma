import {DocumentWithData} from "./model";
import {
  DOCUMENT_NOTE,
  NOTE_TEMPLATE,
  TEMPLATE_EMPTY,
} from "./predefined";

const regExp = new RegExp("\\${{([^}]*)}}", "g");

const TITLE_PLACEHOLDER = "Title";

export function createEmptyTemplate(): DocumentWithData {
  return {
    "iri": TEMPLATE_EMPTY,
    "identifier": "",
    "types": [],
    "title": "Empty document",
    "description": "",
    "created": new Date().toISOString().substring(0, 10),
    "properties": {},
    "items": [],
  };
}

export function createQuickNoteTemplate(): DocumentWithData {
  const now = new Date().toISOString().substring(0, 10);
  return {
    "iri": NOTE_TEMPLATE,
    "identifier": "",
    "types": [DOCUMENT_NOTE],
    "title": "Quick note",
    "description": "${{Description}}",
    "created": now,
    "properties": {},
    "items": [{
      "identifier": "000",
      "types": [],
      "properties": {},
      "created": now,
      "text": "[${{Title}}](${{URL}})",
      "image": undefined,
    }],
  };
}

export function selectTemplateValues(document: DocumentWithData): string[] {
  const result = new Set<string>();
  result.add(TITLE_PLACEHOLDER); // Add title by default.
  addPlaceholdersToSet(result, document.title);
  addPlaceholdersToSet(result, document.description);
  for (const items of Object.values(document.properties)) {
    for (const item of items) {
      addPlaceholdersToSet(result, item);
    }
  }
  for (const item of document.items) {
    addPlaceholdersToSet(result, item.text);
  }
  return [...result.values()];
}

function addPlaceholdersToSet(collector: Set<string>, value: string): void {
  [...value.matchAll(regExp)]
    .map(item => item[1])
    .forEach(item => collector.add(item));
}

export function applyTemplateValues(document: DocumentWithData, values: { name: string, value: string }[]): DocumentWithData {
  const replacements: Record<string, string> = {};
  values.forEach(item => {
    replacements["${{" + item.name + "}}"] = item.value;
  });
  const title = replacements["${{" + TITLE_PLACEHOLDER + "}}"];
  const description = replaceAll(document.description, replacements);
  const properties : Record<string, string[]> = {};
  for (const [key, values] of Object.entries(document.properties)) {
    properties[key] = values.map(value => replaceAll(value, replacements));
  }
  const items = [];
  for (const item of document.items) {
    items.push({
      ...item,
      "text": replaceAll(item.text, replacements),
    });
  }
  return {
    ...document,
    title,
    description,
    properties,
    items,
  };
}

function replaceAll(value:string, replacements: Record<string, string>): string {
  let result = value;
  for (const [source, target] of Object.entries(replacements)) {
    result = result.replaceAll(source, target);
  }
  return result;
}

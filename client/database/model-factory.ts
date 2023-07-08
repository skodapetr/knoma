import {DocumentWithData, Note} from "./model";
import {getConfiguration} from "../application/configuration";

export function createEmptyDocument(): DocumentWithData {
  return createDocument({
    "iri": "",
    "identifier": "",
    "types": [],
    "title": "",
    "description": "",
    "created": "",
    "properties": {},
    "items": [],
  });
}

export function createDocument(template: DocumentWithData): DocumentWithData {
  const configuration = getConfiguration();
  const identifier = createIdentifier();
  return {
    ...template,
    "iri": configuration.domain + identifier,
    "identifier": identifier,
    "created": new Date().toISOString().substring(0, 10),
  };
}

function createIdentifier() {
  const time = new Date().getTime();
  return time + "-xxxx-yxxx".replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0, v = c == "x" ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function createNote(
  identifier: string, text: string, types: string[] = [],
): Note {
  return {
    "identifier": identifier,
    "types": types,
    "properties": {},
    "created": new Date().toISOString().substring(0, 10),
    "text": text,
    "image": undefined,
  };
}

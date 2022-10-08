import {DocumentWithData, Note} from "./model";
import {getConfiguration} from "../application/configuration";

export function createDocument(): DocumentWithData {
  const configuration = getConfiguration();
  return {
    "iri": configuration.domain + createIdentifier(),
    "types": [],
    "title": "",
    "description": "",
    "created": new Date().toISOString().substr(0, 10),
    "properties": {},
    "items": [],
  };
}

function createIdentifier() {
  const time = new Date().getTime();
  return time + "-xxxx-yxxx".replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0, v = c == "x" ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function createNote(identifier: string, text: string): Note {
  return {
    "identifier": identifier,
    "properties": {},
    "created": new Date().toISOString().substr(0, 10),
    "text": text,
    "image": undefined,
  };
}

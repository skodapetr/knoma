import {DocumentWithData, Note} from "./model";

export function createDocument(): DocumentWithData {
  return {
    "iri": "http://localhost/" + createIdentifier(),
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

export function createNote(iri: string, text: string): Note {
  return {
    "iri": iri,
    "types": [],
    "properties": {},
    "created": new Date().toISOString().substr(0, 10),
    "text": text,
    "image": undefined,
  };
}

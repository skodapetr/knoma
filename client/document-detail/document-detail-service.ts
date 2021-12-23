import {createNote, Note} from "../database";

export function createNewNote(iri: string, notes: Note[]): Note {
  let nextIndex = 0;
  if (notes.length > 0) {
    const lastIri = notes[notes.length - 1].iri;
    const number = lastIri.substr(lastIri.lastIndexOf("/") + 1);
    nextIndex = Number(number) + 1;
  }
  return createNote(iri + "/note/" + String(nextIndex).padStart(3, "0"), "");
}

export function getTextAreas(): HTMLInputElement[] {
  const selector = ".note-content-input textarea";
  return [...window.document.querySelectorAll(selector) as any];
}

export function focusPreviousNote(): void {
  const nodes = getTextAreas();
  const active = document.activeElement as any;
  const index = nodes.indexOf(active);
  if (index < 1 || index - 1 > nodes.length) {
    return;
  }
  nodes[index - 1].focus();
}

export function focusNextNote(): void {
  const nodes = getTextAreas();
  const active = document.activeElement as any;
  const index = nodes.indexOf(active);
  if (index === -1 || index + 1 >= nodes.length) {
    return;
  }
  nodes[index + 1].focus();
}
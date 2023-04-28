import {createNote, Note} from "../database";

export function createNewNote(iri: string, notes: Note[]): Note {
  const nextIndex = notes.map(note => Number(note.identifier))
    .reduce((left, right) => Math.max(left, right), 0) + 1;
  // Use types from last note.
  let types: string[] = [];
  if (notes.length > 0) {
    types = [...notes[notes.length - 1].types];
  }
  return createNote(String(nextIndex).padStart(3, "0"), "", types);
}

export function getTextAreas(): HTMLInputElement[] {
  const selector = ".note-content-input textarea:first-of-type";
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

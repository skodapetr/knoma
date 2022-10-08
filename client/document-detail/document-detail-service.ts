import {createNote, Note} from "../database";

export function createNewNote(iri: string, notes: Note[]): Note {
  let nextIndex = 0;
  if (notes.length > 0) {
    nextIndex = Number(notes[notes.length - 1].identifier) + 1;
  }
  return createNote(String(nextIndex).padStart(3, "0"), "");
}

export function getTextAreas(): HTMLInputElement[] {
  const selector = ".note-content-input textarea";
  return [...window.document.querySelectorAll(selector) as HTMLInputElement];
}

export function focusPreviousNote(): void {
  const nodes = getTextAreas();
  const active = document.activeElement as HTMLInputElement;
  const index = nodes.indexOf(active);
  if (index < 1 || index - 1 > nodes.length) {
    return;
  }
  nodes[index - 1].focus();
}

export function focusNextNote(): void {
  const nodes = getTextAreas();
  const active = document.activeElement as HTMLInputElement;
  const index = nodes.indexOf(active);
  if (index === -1 || index + 1 >= nodes.length) {
    return;
  }
  nodes[index + 1].focus();
}
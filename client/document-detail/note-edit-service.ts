import {Note} from "../database";
import {QUOTE} from "../database/predefined";

export function onToggleQuote(note:Note): Note {
  const prevTypes = note.types ?? [];
  let nextTypes;
  const index = prevTypes.indexOf(QUOTE);
  if (index === -1) {
    nextTypes = [...prevTypes, QUOTE];
  } else {
    nextTypes = [
      ...prevTypes.slice(0, index),
      ...prevTypes.slice(index + 1),
    ];
  }
  return {
    ...note,
    "types": nextTypes,
  };
}

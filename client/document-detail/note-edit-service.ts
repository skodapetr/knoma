export type TextWithCursor = {
  value: string;
  positionStart: number;
  positionEnd: number;
}

export function onKeyAltDown(
  text: string, event: KeyboardEvent): TextWithCursor | null {
  const target = event.target as HTMLInputElement;
  const start = target.selectionStart;
  const end = target.selectionEnd;
  if (start === null || end === null) {
    return null;
  }
  return null;
}



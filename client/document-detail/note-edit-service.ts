export type TextWithCursor = {
  value: string;
  positionStart: number;
  positionEnd: number;
}

export function onKeyAltDown(
  text: string, event: KeyboardEvent): TextWithCursor | null {
  const key = event.key;
  const target = event.target as HTMLInputElement;
  const start = target.selectionStart;
  const end = target.selectionEnd;
  if (start === null || end === null) {
    return null;
  }
  let prefix;
  let suffix;
  if (key === "q") {
    prefix = "\\begin{quote}";
    suffix = "\\end{quote}";
  } else if (key === "c") {
    prefix = "\\begin{code}";
    suffix = "\\end{code}";
  } else {
    return null;
  }
  if (start === end) {
    return insertText(prefix, suffix, text, start);
  } else {
    return wrapSelectedText(prefix, suffix, text, start, end);
  }
}

function insertText(
  prefix: string, suffix: string, text: string, position: number,
): TextWithCursor {
  const before = text.substr(0, position);
  const after = text.substr(position);
  const insert = prefix + suffix;
  return {
    "value": before + insert + after,
    "positionStart": position + prefix.length,
    "positionEnd": position + prefix.length,
  };
}

function wrapSelectedText(
  prefix: string, suffix: string, text: string, start: number, end: number,
): TextWithCursor {
  const before = text.substr(0, start);
  const middle = text.substr(start, end - start);
  const after = text.substr(end);
  return {
    "value": before + prefix + middle + suffix + after,
    "positionStart": end + prefix.length + suffix.length,
    "positionEnd": end + prefix.length + suffix.length,
  };
}



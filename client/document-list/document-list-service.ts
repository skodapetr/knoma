import {Document, getDatabase, PredicateEditType} from "../database";

export type TagWithColour = {
  label: string;
  color: string;
}

export async function buildDocumentTagList(
  document: Document,
) : Promise<TagWithColour[]> {
  const database = getDatabase();
  const result = [];
  for (const iri of Object.keys(document.properties).sort()) {
    const predicate = await database.getPredicate(iri);
    if (predicate === undefined) {
      continue;
    }
    const color = predicate.listColour;
    if (color === undefined) {
      continue;
    }
    const priority = predicate.listPriority;
    if (predicate.type === PredicateEditType.Codelist) {
      for (const value of document.properties[iri]) {
        const label = await database.getLabel(value);
        result.push({
          "label": label,
          "color": color,
          "priority": priority,
        });
      }
    } else {
      for (const label of document.properties[iri]) {
        result.push({
          "label": label,
          "color": color,
          "priority": priority,
        });
      }
    }
  }
  result.sort((left, right) => right.priority - left.priority);
  return result;
}

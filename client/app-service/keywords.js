import {fetchJson} from "./http";

let keywordsMap = {};

let keywordsLabels = [];

export function fetchKeywords() {
  if (keywordsMap.length > 0) {
    return Promise.resolve();
  }
  return fetchJson("./api/v1/keywords").then((content) => {
    content.json.forEach((item) => {
      keywordsMap[item.label] = item;
      keywordsLabels.push(item.label);
    });
  });
}

export function getKeywordsMap() {
  return keywordsMap;
}

export function getKeywordsLabels() {
  return keywordsLabels;
}

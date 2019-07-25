import {fetchJson, postJson, putJson, deleteJson} from "./../app-service/http";

export function fetchList() {
  return fetchJson("api/v1/documents");
}

export function fetchDocument(id) {
  return fetchJson("api/v1/documents/" + id).then(prepareDocumentForUse);
}

function prepareDocumentForUse(response) {
  const nodesById = {};
  const nodes = response["json"]["nodes"];
  nodes.forEach((node) => {
    node["_"] = {
      "children": []
    };
    nodesById[node["id"]] = node;
  });
  // Add reference to a parent.
  nodes.forEach((node) => {
    if (!node["parent"]) {
      return;
    }
    node["_"]["parent"] = nodesById[node["parent"]];
    node["_"]["parent"]["_"]["children"].push(node);
  });
  // Compute level.
  nodes.forEach((node) => {
    let level = 0;
    let parentRef = node["_"]["parent"];
    while (parentRef) {
      level += 1;
      parentRef = parentRef["_"]["parent"];
    }
    node["_"]["level"] = level;
  });
  return response;
}

export function addLocalData(node, parent) {
  node["_"] = {
    "children": []
  };
  if (parent) {
    node["_"]["parent"] = parent;
    node["_"]["level"] = parent["_"]["level"] + 1;
    parent["_"]["children"].push(node);
  } else {
    node["_"]["level"] = 0;
  }
}

export function createDocument(document) {
  const url = "api/v1/documents";
  return postJson(url, document);
}

export function saveDocument(id, document) {
  const url = "api/v1/documents/" + id;
  const documentToSave = prepareDocumentForSave(document);
  return putJson(url, documentToSave);
}

function prepareDocumentForSave(document) {
  return {
    ...document,
    "nodes": document["nodes"].map((node) => {
      const {"_": localProps, ...data} = node;
      return data;
    })
  };
}

export function deleteDocument(id) {
  const url = "api/v1/documents/" + id;
  return deleteJson(url);
}
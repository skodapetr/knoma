const path = require("path");
const fileSystem = require("fs");
const config = require("../config");
const io = require("../utils");

const documents = [];
const keywords = {};

module.exports = {
  "initialize": initialize,
  "path": getPath,
  "create": createFile,
  "update": updateFile,
  "delete": deleteFile,
  "list": createItemList,
  "checkId": checkIdPattern,
  "keywords": getKeywords,
};

function initialize() {
  const documentDir = path.join(config.storage, "documents");

  io.mkDir(documentDir);
  fileSystem.readdirSync(documentDir).forEach((fileName) => {
    const filePath = path.join(documentDir, fileName);
    const id = fileName.substring(0, fileName.lastIndexOf("."));
    const content = io.fileToJson(filePath);
    documents.push(createItem(filePath, id, content));
  });
  loadPredefinedKeywords();
  collectKeywords();
}

function createItem(filePath, id, content) {
  return {
    "path": filePath,
    "id": id,
    "title": content.title,
    "keywords": content.keywords,
    "published": content.published,
  };
}

function getPath(id) {
  const index = indexOfItem(id);
  if (index === undefined) {
    return undefined;
  }
  return documents[index].path;
}

function indexOfItem(id) {
  for (let index = 0; index < documents.length; index += 1) {
    if (documents[index].id === id) {
      return index;
    }
  }
  return undefined;
}

function createFile(content) {
  const id = createUniqueId();
  const documentDir = path.join(config.storage, "documents");
  documents.push({
    "id": id,
    "path": path.join(documentDir, `${id}.json`),
  });
  return updateFile(id, content).then(() => id);
}

function createUniqueId() {
  let id = createRandomId();
  while (fileSystem.existsSync(getPath(id))) {
    id = createRandomId();
  }
  return id;
}

function createRandomId() {
  /* eslint-disable no-bitwise, no-mixed-operators */
  const timePrefix = (new Date()).getTime();
  return timePrefix + "-xxxx-xxxx".replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const
      v = c === "x" ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function updateFile(id, content) {
  const filePath = getPath(id);
  const index = indexOfItem(id);
  if (index === undefined) {
    const error = new Error("File not found.");
    error.status = "not_found";
    return Promise.reject(error);
  }
  const newDocumentVersion = createItem(documents[index].path, id, content);
  updateKeywords(documents[index], newDocumentVersion);
  documents[index] = newDocumentVersion;

  const contentAsStr = JSON.stringify(content, null, 2);
  return new Promise((resolve, reject) => {
    fileSystem.writeFile(filePath, contentAsStr, "utf8", (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

function updateKeywords(oldDocument, newDocument) {
  removeKeywords(oldDocument);
  addKeywords(newDocument);
}

function removeKeywords(document) {
  getDocumentKeywords(document).forEach((keyword) => {
    keywords[keyword].count -= 1;
  });
}

function addKeywords(document) {
  getDocumentKeywords(document).forEach((keyword) => {
    if (keywords[keyword] === undefined) {
      keywords[keyword] = {
        "count": 0,
        "type": "user",
      };
    }
    keywords[keyword].count += 1;
  });
}

function deleteFile(id) {
  const index = indexOfItem(id);
  if (index === undefined) {
    return Promise.resolve();
  }
  const item = documents.splice(index, 1)[0];
  removeKeywords(item);
  return io.remove(item.path);
}

function getDocumentKeywords(document) {
  if (!Array.isArray(document.keywords)) {
    return [];
  }
  return document.keywords;
}

function createItemList() {
  return documents.map(item => (
    {
      "id": item.id,
      "title": item.title,
      "keywords": item.keywords,
      "published": item.published,
    }
  ));
}

function checkIdPattern(string) {
  const pattern = /\d+-[a-zA-Z0-9]+-[a-zA-Z0-9]+/i;
  return pattern.test(string);
}

function loadPredefinedKeywords() {
  const keywordsFile = path.join(config.storage, "keywords.json");
  const content = io.fileToJson(keywordsFile);
  content.forEach((keyword) => {
    if (keywords[keyword] === undefined) {
      keywords[keyword] = {
        "count": 0,
        "type": "predefined",
      };
    } else {
      keywords[keyword].type = "predefined";
    }
  });
}

function collectKeywords() {
  documents.forEach(document => addKeywords(document));
}

function getKeywords() {
  const result = [];
  Object.keys(keywords).forEach((key) => {
    result.push({
      "label": key,
      ...keywords[key],
    });
  });
  return result;
}

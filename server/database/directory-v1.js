const path = require("path");
const utilities = require("./utilitis");

const logger = require("../logging");
const configuration = require("../configuration");

let databaseContent = {
  documents: [],
};

/**
 * Database store objects, such as images, in extra file for each document.
 * There is no pointer from the main database file to the objects files.
 */
module.exports = {
  /**
   * Perform initialization, can load documents from secondary memory.
   */
  "initialize": initialize,
  /**
   * List all document without their items and return them.
   */
  "listDocuments": listDocuments,
  /**
   * Load and return documents with items.
   */
  "loadDocument": loadDocument,
  /**
   * Store full document.
   */
  "storeDocument": storeDocument,
  /**
   * Delete document, return true when document was deleted.
   */
  "deleteDocument": deleteDocument,
};

async function initialize() {
  const objectsDirectoryPath = getObjectsPath();
  if (await utilities.fileNotExists(objectsDirectoryPath)) {
    await utilities.createDirectory(objectsDirectoryPath);
  }
  const filePath = getDataFilePath();
  if (await utilities.fileNotExists(filePath)) {
    return;
  }
  logger.info("Reading database file ...");
  databaseContent = await utilities.readJsonFromFile(filePath);
  logger.info("Reading database file ... done");
}

function getObjectsPath() {
  return path.join(configuration.databasePath, "database-directory-objects-v1");
}

function getDataFilePath() {
  return path.join(configuration.databasePath, "database-directory-v1.json");
}

async function listDocuments() {
  const result = databaseContent.documents
    .map(document => ({...document, "items": undefined}));
  result.sort((left, right) => right.created.localeCompare(left.created));
  return result;
}

async function loadDocument(identifier) {
  for (const document of databaseContent.documents) {
    if (document.iri === identifier) {
      return await loadDocumentObjects(document);
    }
  }
  return null;
}

/**
 * For given document load all objects.
 */
async function loadDocumentObjects(document) {
  const items = [];
  const objectsPath = getDocumentObjectsPath(document.identifier);
  if (await utilities.fileNotExists(objectsPath)) {
    return document;
  }
  const objects = await utilities.readJsonFromFile(objectsPath);
  for (const item of document.items) {
    const itemObjects = objects.data[item.iri];
    if (itemObjects === undefined) {
      items.push(item);
    } else {
      items.push({
        ...item,
        "image": itemObjects.image,
      });
    }
  }
  return {
    ...document,
    items,
  };
}

function getDocumentObjectsPath(identifier) {
  return path.join(getObjectsPath(), identifier + ".json");
}

async function storeDocument(document) {
  const documentWithoutObjects = await storeDocumentLargeObjects(document);
  updateDocument(documentWithoutObjects);
  await saveDatabaseFile();
}

/**
 * For given document store all images
 */
async function storeDocumentLargeObjects(document) {
  const {"document": nextDocument, objects} =
    extractObjectsFromDocument(document);
  const objectsIsEmpty = Object.keys(objects.data).length === 0;
  const objectsPath = getDocumentObjectsPath(document.identifier);
  if (objectsIsEmpty) {
    if (await utilities.fileNotExists(objectsPath)) {
      return nextDocument;
    } else {
      await utilities.deleteFile(objectsPath);
    }
  } else {
    await utilities.writeJsonToFile(objects, objectsPath);
  }
  // Return new object without large objects.
  return nextDocument;
}

/**
 * Extract objects from a document.
 */
function extractObjectsFromDocument(document) {
  const items = [];
  const objects = {};
  for (const item of document.items) {
    if (item.image === undefined) {
      items.push(item);
    } else {
      objects[item.iri] = {
        "image": item.image,
      };
      items.push({
        ...item,
        image: undefined,
      });
    }
  }
  return {
    "document": {
      ...document,
      items,
    },
    "objects": {
      "data": objects,
    },
  };
}

function updateDocument(document) {
  const documents = databaseContent.documents;
  for (let index = 0; index < documents.length; ++index) {
    if (documents[index].iri === document.iri) {
      documents[index] = document;
      return;
    }
  }
  documents.push(document);
}

async function saveDatabaseFile() {
  await utilities.writeJsonToFile(databaseContent, getDataFilePath());
}

async function deleteDocument(identifier) {
  const documents = databaseContent.documents;
  for (let index = 0; index < documents.length; ++index) {
    if (documents[index].iri === identifier) {
      documents.splice(index, 1);
      break;
    }
  }
  // Update database file.
  await saveDatabaseFile();
  // Remove objects file.
  const objectsPath = getDocumentObjectsPath(document.iri);
  if (await utilities.fileNotExists(objectsPath)) {
    await utilities.deleteFile(objectsPath);
  }
}


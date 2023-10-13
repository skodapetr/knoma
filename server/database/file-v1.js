const path = require("path");
const utilities = require("./utilitis");

const logger = require("../logging");
const configuration = require("../configuration");

let databaseContent = {documents: []};

/**
 * Database store all content in a single file.
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
  const filePath = getDataFilePath();
  if (await utilities.fileNotExists(filePath)) {
    return;
  }
  logger.info("Reading database file ...");
  databaseContent = await utilities.readJsonFromFile(filePath);
  logger.info("Reading database file ... done");
}

function getDataFilePath() {
  return path.join(configuration.databasePath, "database-file-v1.json");
}

async function listDocuments() {
  const result = databaseContent.documents
    .map(document => ({...document, "items": undefined}));
  result.sort((left, right) => {
    const created = right.created.localeCompare(left.created);
    if (created === 0) {
      return right.identifier.localeCompare(left.identifier);
    } else {
      return created;
    }
  });
  return result;
}

async function loadDocument(identifier) {
  for (const document of databaseContent.documents) {
    if (document.iri === identifier) {
      return document;
    }
  }
  return null;
}

async function storeDocument(document) {
  updateDocument(document);
  await saveDatabaseFile();
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
}

const path = require("path");
const fileSystem = require("fs");

const logger = require("./logging");
const configuration = require("./configuration");

let databaseFile = [];

/**
 * All methods are async.
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
  logger.info("Reading database file ... ");
  const content = fileSystem.readFileSync(getDataFilePath());
  databaseFile = JSON.parse(content);
  logger.info("Reading database file ... done");
}

function getDataFilePath() {
  return path.join(configuration.databasePath, "database.json");
}

async function listDocuments() {
  const result = databaseFile.documents
    .map(document => ({...document, "items": undefined}));
  result.reverse();
  return result;
}

async function loadDocument(iri) {
  for (const document of databaseFile.documents) {
    if (document.iri === iri) {
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
  const documents = databaseFile.documents;
  for (let index = 0; index < documents.length; ++index) {
    if (documents[index].iri === document.iri) {
      documents[index] = document;
      return;
    }
  }
  documents.push(document);
}

async function saveDatabaseFile() {
  const contentAsStr = JSON.stringify(databaseFile, null, 2);
  return new Promise((accept, reject) => {
    fileSystem.writeFile(getDataFilePath(), contentAsStr, "utf8", (error) => {
      if (error === null) {
        accept();
      } else {
        reject(error);
      }
    });
  });
}

async function deleteDocument(iri) {
  const documents = databaseFile.documents;
  for (let index = 0; index < documents.length; ++index) {
    if (documents[index].iri === iri) {
      documents.splice(index, 1);
      break;
    }
  }
  //
  await saveDatabaseFile();
}

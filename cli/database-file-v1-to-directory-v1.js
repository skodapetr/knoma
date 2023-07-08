//
// Convert file v1 database to directory v1 database.
// Directory database is slower to load documents but consumes
// less memory
//
const logger = require("../server/logging");

const fileDatabase = require("../server/database/file-v1");
const directoryDatabase = require("../server/database/directory-v1");

(async function main() {
  await fileDatabase.initialize();
  await directoryDatabase.initialize();
  const documents = await fileDatabase.listDocuments();
  logger.info("Converting documents.", {count: documents.length});
  for (const document of documents) {
    const fullDocument = await fileDatabase.loadDocument(document.iri);
    updateDocument(fullDocument);
    await directoryDatabase.storeDocument(fullDocument);
  }
})();

/**
 * Replace "iri" with identifier, we construct IRI using instance base URL later.
 */
function updateDocument(document) {
  const iri = document.iri;
  document.identifier = iri.substring(iri.lastIndexOf("/") + 1);
}

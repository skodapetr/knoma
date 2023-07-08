//
// Convert content of directory v1 database to file v1 database.
// Since file database is using a single file it can be used to
// create backups.
//
const logger = require("../server/logging");

const fileDatabase = require("../server/database/file-v1");
const directoryDatabase = require("../server/database/directory-v1");

(async function main() {
  await fileDatabase.initialize();
  await directoryDatabase.initialize();
  const documents = await directoryDatabase.listDocuments();
  logger.info("Converting documents.", {count: documents.length});
  for (const document of documents) {
    const fullDocument = await fileDatabase.loadDocument(document.iri);
    await fileDatabase.storeDocument(fullDocument);
  }
})();

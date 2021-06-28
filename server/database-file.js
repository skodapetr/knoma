const fileSystem = require("fs");
const bodyParser = require("body-parser");

const logger = require("./logging");
const configuration = require("./configuration");

let databaseFile = [];

module.exports = bindRoutes;

function bindRoutes(router) {
  router.get("/documents",
    createGetHandler());

  router.post("/documents",
    bodyParser.json({"limit": "16mb"}),
    createPostHandler());

  router.delete("/documents",
    createDeleteHandler());

}

(function initialize() {
  logger.info("Reading database file ... ");
  const content = fileSystem.readFileSync(getDataFilePath());
  databaseFile = JSON.parse(content);
  logger.info("Reading database file ... done");
})();

function getDataFilePath() {
  return configuration.databasePath;
}

function createGetHandler() {
  return (req, res) => {
    if (req.query.iri === undefined) {
      handleIndexRequest(res);
    } else {
      handleDocumentRequest(res, req.query.iri);
    }
  };
}

function handleIndexRequest(res) {
  const documents = databaseFile.documents
    .map(document => ({...document, "items": undefined}));
  res.json(documents);
}

function handleDocumentRequest(res, iri) {
  for (const document of databaseFile.documents) {
    if (document.iri === iri) {
      res.json(document);
      return;
    }
  }
  res.status(404);
}

function createPostHandler() {
  return (req, res) => {
    updateDocument(req.body);
    saveDatabaseFile(res);
  };
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

function saveDatabaseFile(res) {
  const contentAsStr = JSON.stringify(databaseFile, null, 2);
  fileSystem.writeFile(getDataFilePath(), contentAsStr, "utf8", (error) => {
    if (error) {
      res.status(500);
      res.json(error);
    } else {
      res.status(200);
      res.end();
    }
  });
}

function createDeleteHandler() {
  return (req, res) => {
    const iri = req.query.iri;
    const documents = databaseFile.documents;
    for (let index = 0; index < documents.length; ++index) {
      if (documents[index].iri === iri) {
        documents.splice(index, 1);
        saveDatabaseFile(res);
        return;
      }
    }
    res.status(404).send();
  };
}

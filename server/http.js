const bodyParser = require("body-parser");

module.exports = {createRoutes};

function createRoutes(router, service) {

  router.get("/documents",
    createGetHandler(service));

  router.post("/documents",
    bodyParser.json({"limit": "16mb"}),
    createPostHandler(service));

  router.delete("/documents",
    createDeleteHandler(service));

}

function createGetHandler(service) {
  return async (req, res) => {
    if (req.query.iri === undefined) {
      await handleIndexRequest(service, res);
    } else {
      await handleDocumentRequest(service, res, req.query.iri);
    }
  };
}

async function handleIndexRequest(service, res) {
  res.json(await service.listDocuments());
}

async function handleDocumentRequest(service, res, iri) {
  try {
    const document = await service.loadDocument(iri);
    if (document === null) {
      res.status(404);
    } else {
      res.json(document);
    }
  } catch (error) {
    res.status(500);
    res.json(error);
  }
}

function createPostHandler(service) {
  return async (req, res) => {
    try {
      await service.storeDocument(req.body);
      res.status(200).send();
    } catch (error) {
      res.status(500);
      res.json(error);
    }
  };
}

function createDeleteHandler(service) {
  return async (req, res) => {
    const iri = req.query.iri;
    try {
      await service.deleteDocument(iri);
      res.status(200).send();
    } catch (error) {
      res.status(500);
      res.json(error);
    }
  };
}

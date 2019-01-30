const bodyParser = require("body-parser");
const storage = require("./storage");
const io = require("../utils");

(function initialize() {
  storage.initialize();
}());

module.exports = function bindRoutes(router) {
  router.get("/documents", listHandlerFactory());
  router.post("/documents", bodyParser.json(), createHandlerFactory());
  router.get("/documents/:id", detailHandlerFactory());
  router.put("/documents/:id", bodyParser.json(), updateHandlerFactory());
  router.delete("/documents/:id", deleteHandlerFactory());
  //
  router.get("/keywords", getKeywordsFactory());
};

function listHandlerFactory() {
  return (req, res) => {
    res.json(storage.list());
  };
}

function detailHandlerFactory() {
  return (req, res) => {
    const id = req.params.id;
    if (!storage.checkId(id)) {
      invalidId(res);
      return;
    }
    const path = storage.path(id);
    if (path === undefined) {
      res.status(404);
      res.json({
        "error": "Object does not exists.",
      });
      return;
    }
    io.fileToResponse(path, res, "application/json");
  };
}

function invalidId(response) {
  response.status(403);
  response.json({
    "error": "Invalid request.",
  });
}

function createHandlerFactory() {
  return (req, res) => {
    const content = req.body;
    storage.create(content).then((id) => {
      res.status(201);
      res.json({
        "id": id,
      });
    }).catch((error) => {
      res.status(500);
      res.json(error);
    });
  };
}

function updateHandlerFactory() {
  return (req, res) => {
    const id = req.params.id;
    if (!storage.checkId(id)) {
      invalidId(res);
      return;
    }
    const content = req.body;
    storage.update(id, content).then(() => {
      res.status(200);
      res.end();
    }).catch((error) => {
      res.status(500);
      res.json(error);
    });
  };
}

function deleteHandlerFactory() {
  return (req, res) => {
    const id = req.params.id;
    if (!storage.checkId(id)) {
      invalidId(res);
      return;
    }
    storage.delete(id).then(() => {
      res.status(200);
      res.end();
    }).catch((error) => {
      res.status(500);
      res.json(error);
    });
  };
}

function getKeywordsFactory() {
  return (req, res) => {
    res.json(storage.keywords());
  };
}

const fileSystem = require("fs");
const bodyParser = require("body-parser");

const logger = require("./logging");
const configuration = require("./configuration");

module.exports = bindRoutes;

function bindRoutes(router) {
  router.get("/documents-file", createGetHandler());
  router.post("/documents-file", bodyParser.json({
    "limit": "128mb"
  }), createPostHandler());
}

function createGetHandler() {
  return (req, res) => {
    fileToResponse(getDataFilePath(), res, "application/json");
  };
}

function getDataFilePath() {
  return configuration.databasePath;
}

function fileToResponse(path, response, type) {
  if (!fileSystem.existsSync(path)) {
    response.status(404);
    response.end();
    return;
  }
  fileSystem.stat(path, (error, stat) => {
    if (error) {
      logger.error("Can't get file stats.", error);
      response.status(500);
      response.end();
      return;
    }
    response.writeHead(200, {
      "Content-Type": type,
      "Content-Length": stat.size,
    });
    fileToStream(path, response);
  });
}

function fileToStream(path, stream) {
  const inputStream = fileSystem.createReadStream(path);
  inputStream.pipe(stream);
}

function createPostHandler() {
  return (req, res) => {
    const contentAsStr = JSON.stringify(req.body, null, 2);
    fileSystem.writeFile(getDataFilePath(), contentAsStr, "utf8", (error) => {
      if (error) {
        res.status(500);
        res.json(error);
      } else {
        res.status(200);
        res.end();
      }
    });
  };
}

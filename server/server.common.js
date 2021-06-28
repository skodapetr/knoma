const express = require("express");
const logger = require("./logging");
const config = require("./configuration");
const database = require("./database-file");

function initialize(app) {
  const router = express.Router();
  database(router);
  app.use("/api/v1", router);
}

function start(app) {
  const port = config.port;
  app.listen(port, (error) => {
    if (error) {
      logger.error("Can't start server.", {"error": error});
    }
    logger.info("Server has been started. ", {"port": port});
  });
}

module.exports = {
  "initialize": initialize,
  "start": start,
};

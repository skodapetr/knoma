const path = require("path");
const express = require("express");
const server = require("../server-common");

(async function startProductionServer() {
  const app = express();
  await server.initialize(app);
  initializeStatic(app);
  server.start(app);
}());

function initializeStatic(app) {
  const assetsDir = path.join(__dirname, "..", "..", "dist");
  app.use("/", express.static(assetsDir));
}

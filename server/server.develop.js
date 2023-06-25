const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const config = require("../build/webpack.develop.js");
const server = require("./server.common");

(async function startDevelopServer() {
  const app = express();
  await server.initialize(app);
  initializeWebpack(app);
  server.start(app);
}());

function initializeWebpack(app) {
  const webpackCompiler = webpack(config);
  app.use(webpackDevMiddleware(webpackCompiler, {
    "publicPath": config.output.publicPath.substr(1),
    "stats": "minimal",
  }));
  app.use(webpackHotMiddleware(webpackCompiler));
}

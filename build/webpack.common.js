const path = require("path");
const webpack = require("webpack");
const WebpackBar = require("webpackbar");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const {VueLoaderPlugin} = require("vue-loader");

module.exports = {
  "entry": [
    path.join(__dirname, "..", "client", "index.js"),
  ],
  "output": {
    "path": path.join(__dirname, "..", "dist"),
    "filename": "[name].[fullhash:16].bundle.js",
    "publicPath": "./",
  },
  "optimization": {
    "runtimeChunk": "single",
    "splitChunks": {
      "cacheGroups": {
        "commons": {
          "test": /[\\/]node_modules[\\/]/,
          "name": "vendors",
          "chunks": "all",
        },
      },
    },
  },
  "resolve": {
    "modules": ["node_modules"],
    "extensions": [".js", ".vue", ".ts"],
  },
  "module": {
    "rules": [
      {
        "test": /\.vue$/,
        "use": "vue-loader",
      }, {
        "test": /\.js$/,
        "exclude": /node_modules/,
        "use": "babel-loader",
      }, {
        "test": /\.ts?$/,
        "exclude": /node_modules/,
        "use": "ts-loader",
      },
    ],
  },
  "plugins": [
    new HtmlWebpackPlugin({
      "filename": "index.html",
      "template": path.join(__dirname, "..", "public", "index.html"),
    }),
    new WebpackBar(),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      "__DATABASE__": 0,
      // https://github.com/vuejs/core/tree/main/packages/vue#bundler-build-feature-flags
      "__VUE_OPTIONS_API__": true,
      "__VUE_PROD_DEVTOOLS__": false,
    }),
  ],
};

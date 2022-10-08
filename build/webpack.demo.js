const {merge} = require("webpack-merge");
const webpack = require("webpack");
const production = require("./webpack.production");

module.exports = merge({
  "plugins": [
    new webpack.DefinePlugin({
      "__DATABASE__": 1,
    }),
  ],
}, production);

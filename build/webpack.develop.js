const {merge} = require("webpack-merge");
const ESLintPlugin = require("eslint-webpack-plugin");
const webpack = require("webpack");
const common = require("./webpack.common");

module.exports = merge({
  "mode": "development",
  "devtool": "inline-source-map",
  "entry": [
    "webpack-hot-middleware/client",
  ],
  "devServer": {
    "hot": true,
  },
  "module": {
    "rules": [
      {
        "test": /\.css$/,
        "use": [
          "vue-style-loader",
          "css-loader",
        ],
      },
    ],
  },
  "plugins": [
    new webpack.HotModuleReplacementPlugin(),
    new ESLintPlugin({
      "extensions": ["js", "ts", "vue"],
    }),
  ],
}, common);

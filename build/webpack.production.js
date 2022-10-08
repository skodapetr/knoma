const {merge} = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const common = require("./webpack.common");

module.exports = merge({
  "mode": "production",
  "devtool": "source-map",
  "module": {
    "rules": [
      {
        "test": /\.css$/,
        "use": [
          MiniCssExtractPlugin.loader,
          "css-loader",
        ],
      },
    ],
  },
  "plugins": [
    new MiniCssExtractPlugin({
      "filename": "[name].[chunkhash].css",
    }),
  ],
}, common);

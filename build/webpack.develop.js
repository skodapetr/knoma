const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const common = Object.assign({}, require("./webpack.common"));
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
    "mode": "development",
    "devtool": "inline-source-map",
    "entry": [
        "webpack-hot-middleware/client"
    ],
    "devServer": {
        "hot": true
    },
    "plugins": [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            "filename": "index.html",
            "template": path.join(__dirname, "..", "public", "index.html"),
            "inject": true
        })
    ]
});

const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const common = Object.assign({}, require("./webpack.common"));
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
    "mode": "production",
    "devtool": "inline-source-map",
    "module": {
        "rules": [
            {
                "test": /\.css?$/,
                "use": [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            }
        ]
    },
    "plugins": [
        new MiniCssExtractPlugin({
            "filename": "main.css"
        }),
    ]
});

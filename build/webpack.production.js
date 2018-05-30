const merge = require("webpack-merge");
const common = Object.assign({}, require("./webpack.common"));
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
    "mode": "production",
    "optimization": {
        "splitChunks": {
            "cacheGroups": {
                "commons": {
                    "test": /[\\/]node_modules[\\/]/,
                    "name": "vendor",
                    "chunks": "all",
                    "filename": "commons.js"
                },
            },
        },
    },
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

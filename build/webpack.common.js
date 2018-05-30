const path = require("path");
const {VueLoaderPlugin} = require("vue-loader");

module.exports = {
    "entry": [
        path.join(__dirname, "..", "client", "index.js")
    ],
    "output": {
        "path": path.join(__dirname, "..", "public"),
        "filename": "bundle.js",
        "publicPath": "/"
    },
    "resolve": {
        "modules": ["client", "node_modules"]
    },
    "module": {
        "rules": [
            {
                "test": /\.vue$/,
                "use": "vue-loader"
            }, {
                "test": /\.js$/,
                "use": "babel-loader"
            }
        ]
    },
    "plugins": [
        new VueLoaderPlugin()
    ]
};
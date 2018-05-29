const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
    "entry": [
        path.join(__dirname, "..", "client", "app.js")
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
            }
        ]
    },
    "plugins": [
        new VueLoaderPlugin()
    ]
};
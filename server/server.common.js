const path = require("path");

function initializeApi(app) {
    initializeParsers(app);
}

function initializeParsers(app) {
    const bodyParser = require("body-parser");
    // Parse application/x-www-form-urlencoded.
    app.use(bodyParser.urlencoded({"extended": false}));
    // Parse application/json.
    app.use(bodyParser.json());
}

function start(app) {
    const config = require("../config");
    const port = config.port;
    app.listen(port, function onStart(error) {
        if (error) {
            console.error(error);
        }
        console.info("Listening on port %s.", port);
    });
}

module.exports = {
    "initializeApi" : initializeApi,
    "start": start
};
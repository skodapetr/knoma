function initializeApi(app) {
    // Nothing to do here, for now.
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
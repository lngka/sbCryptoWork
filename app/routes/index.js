/*
This file covers the application routing logic
each route is defined in its own JavaScript file
*/

const path       = require("path");
const test_route = require("./test.js");
const root_route = require("./root.js");

module.exports = function(app) {
    /*main directory*/
    root_route(app);

    /*for testing purpose, remove later*/
    test_route(app);
}

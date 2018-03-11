/*
This file covers the application routing logic
each route is controlled by its own JS file
*/

const path        = require("path");
const root_route  = require("./root.js");
const price_route = require("./price.js");

module.exports = function(app) {
    root_route(app);
    price_route(app);
}

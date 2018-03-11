"use strict";
const path = require("path");

module.exports = function(app) {
    app.route("/p")
        .get(function(req, res) {
            var from = req.query.from;
            var to = req.query.to;

            if (from == "" || to == "") {
                return res.status(400).send("Missing parameters");
            }

            
        });
}

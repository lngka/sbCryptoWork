"use strict";
const path = require("path");
const request = require('request');


module.exports = function(app) {
    app.route("/p")
        .get(function(req, res) {
            var from = req.query.from;
            var to = req.query.to;
            if (!from || !to)
                return res.status(400).send("Missing parameters");

            var options = {
                "url": "https://min-api.cryptocompare.com/data/price?"
                        +"fsym=" + from + "&tsyms=" + to,
                "method": "GET"
            }

            request(options, function (error, response, body) {
                if (error)
                    return res.status(500).send(error);

                if (!body[to])
                    return res.status(404).send(body);

                return res.status(200).send(body);
            });
        });
}

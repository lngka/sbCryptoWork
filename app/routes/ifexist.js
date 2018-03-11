"use strict";
const path = require("path");
const request = require('request');

module.exports = function(app) {
    app.route("/ifexist/:symbol")
        .get(function (req, res) {
            var symbol = req.params.symbol;
            if (!symbol) {
                return res.status(400).send("Missing parameters. Usage /ifexist/:SYMBOL");
            }

            var options = {
                "url": "https://chasing-coins.com/api/v1/std/coin/" + symbol,
                "method": "GET"
            }

            request(options, function (error, response, body) {
                if (error)
                    return res.status(500).send("Server error");
                    
                var body = JSON.parse(body);
                if (body.error)
                    return res.status(200).send("0");
                else {
                    return res.status(200).send("1");
                }
            });
        })
}

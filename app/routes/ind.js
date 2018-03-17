"use strict";
const path       = require("path");
const request    = require("request");
const calculator = require(path.join(process.cwd(), "app", "controllers", "ind.calculator.js"));


module.exports = function(app) {
    const TIMEFRAME_CODES = process.env.TIMEFRAME_CODES.split(",");
    const TIMEFRAME_CODES_AGG = process.env.TIMEFRAME_CODES_AGGREGATE.split(",");

    app.route("/ind")
        .get(function(req, res) {
            var ind_type = req.query.type;
            var options = req.query.options;
            var pair   = req.query.pair.split(",");
            var tframe = req.query.timeframe.split("");

            if(!ind_type)
                return res.status(400).send("Bad request: Missing indicator type");

            if(pair.length != 2)
                return res.status(400).send("Bad request: Invalid pair format");

            if(tframe.length != 2)
                return res.status(400).send("Bad request: Invalid timeframe format");

            if(!TIMEFRAME_CODES.includes(tframe[0]))
                return res.status(400).send("Bad request: Timeframe " + tframe + " not recognized");
            if(!TIMEFRAME_CODES_AGG.includes(tframe[1]))
                return res.status(400).send("Bad request: Timeframe " + tframe + " not recognized");

            if(options)
                options = options.split(",").map((x) => parseInt(x));

            calculator(ind_type, options, pair, tframe, function(err, result) {
               if (err) {
                   return res.status(500).send(err.message);
               } else {
                   return res.status(200).json(result);
               }
            });
        });
}

"use strict";
const request = require("request");
/*
* This module is used to communicate with Crypto Compare
* OHLC: Open, High, Low, Close
* @func histohour: Get OHLCV from the hourly historical data
*/

const CryptoCompare = {
    "histohour": histohour
};
module.exports = CryptoCompare;
/*
* Get OHLC from the hourly historical data
* @param fsym {string} cryptocurrency symbol of interest
* @param tsym {string} currency symbol to convert into
* @param aggregate {int} Time period to aggregate the data over (e.g. H4 H2 H1)
* @param callback {function} will be called with: err, data
*/
function histohour(fsym, tsym, aggregate, callback){
    var options = {
        "method": "GET",
        "baseUrl": process.env.CRYPTO_COMPARE,
        "uri": "/data/histohour",
        "json": true,
        "qs": {
            "fsym": fsym,
            "tsym": tsym,
            "aggregate": aggregate,
            "limit": process.env.CRYPTO_LIMIT
        }
    }

    request(options, function(err, httpResponse, response){
        if (err) {
            return callback(err, null);
        }

        if(response["Response"] == "Error") {
            var e1 = new Error(response["Message"]);
            return callback(e1, null);
        }

        try {
            var data = response.Data;
            data.forEach(function(datapoint) {
                // trimming unwanted data
                // set undefined is faster than delete
                datapoint["volumefrom"] = undefined;
                datapoint["volumeto"]   = undefined;
            });
            return callback(null, data);
        } catch (e) {
            return callback(e, null);
        }
    })
}

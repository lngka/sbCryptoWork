"use strict";
const request = require("request");

/*
* This module is used to communicate with Crypto Compare
* OHLC: Open, High, Low, Close price of currency
* @function histohour: Get OHLC from the hourly historical data
*/
const CryptoCompare = {
    "histohour": histohour,
    "histoday" : histoday,
    "histominute": histominute
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
    const CRYPTO_LIMIT = parseInt(process.env.CRYPTO_LIMIT);

    var options = {
        "method": "GET",
        "baseUrl": process.env.CRYPTO_COMPARE,
        "uri": "/data/histohour",
        "json": true,
        "qs": {
            "fsym": fsym,
            "tsym": tsym,
            // aggregate must smaller than limit, default = 1 = no aggregation
            "aggregate": (aggregate < CRYPTO_LIMIT)? aggregate : 1,
            "limit": CRYPTO_LIMIT
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

/*
* Get OHLC from the daily historical data
* @param fsym {string} cryptocurrency symbol of interest
* @param tsym {string} currency symbol to convert into
* @param aggregate {int} Time period to aggregate the data over (e.g. D1)
* @param callback {function} will be called with: err, data
*/
function histoday(fsym, tsym, aggregate, callback){
    const CRYPTO_LIMIT = parseInt(process.env.CRYPTO_LIMIT);

    var options = {
        "method": "GET",
        "baseUrl": process.env.CRYPTO_COMPARE,
        "uri": "/data/histoday",
        "json": true,
        "qs": {
            "fsym": fsym,
            "tsym": tsym,
            // aggregate must smaller than limit, default = 1 = no aggregation
            "aggregate": (aggregate < CRYPTO_LIMIT)? aggregate : 1,
            "limit": CRYPTO_LIMIT
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

/*
* Get OHLC from the minutely historical data
* @param fsym {string} cryptocurrency symbol of interest
* @param tsym {string} currency symbol to convert into
* @param aggregate {int} Time period to aggregate the data over (e.g. M30 M15)
* @param callback {function} will be called with: err, data
*/
function histominute(fsym, tsym, aggregate, callback){
    const CRYPTO_LIMIT = parseInt(process.env.CRYPTO_LIMIT);

    var options = {
        "method": "GET",
        "baseUrl": process.env.CRYPTO_COMPARE,
        "uri": "/data/histominute",
        "json": true,
        "qs": {
            "fsym": fsym,
            "tsym": tsym,
            // aggregate must smaller than limit, default = 1 = no aggregation
            "aggregate": (aggregate < CRYPTO_LIMIT)? aggregate : 1,
            "limit": CRYPTO_LIMIT
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

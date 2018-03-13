"use strict";

// supported indicators and required number of parameter
const Indicators = {
    "rsi" : 1,
    "stoch": 3,
    "stochrsi": 4,
    "adx": 1,
    "macd": 2,
    "cci": 1,
    "ao": 0,
    "mom": 1,
    "williamsr": 1,
    "bullbear": 0,
    "uo": 3,
    "sma": 1,
    "ema" : 1
}

module.exports = function(ind_type, params, callback) {
    if (!Object.keys(Indicators).includes(ind_type)) {
        var e1 = new Error("Indicator not supported: " + ind_type);
        return callback(e1, null);
    }
    
    // some indicators need no parameter
    if (!Indicators[ind_type]) {
        //TODO
        var e2 = new Error(ind_type + " coming soon");
        return callback(e1, null);
    }
    
    if (Indicators[ind_type]) {
        if (!params) {
            var e3 = new Error(Indicators[ind_type] + " parameters required for : " + ind_type);
            return callback(e3, null);
        }
        
        if (params.length != Indicators[ind_type]) {
            var e4 = new Error(Indicators[ind_type] + " parameters required for : " + ind_type);
            return callback(e4, null);
        }
    }
    
    
    return callback(null, "Received " + ind_type);
}
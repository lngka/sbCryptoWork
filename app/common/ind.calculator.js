"use strict";

const Indicators = "rsi stoch stochrsi adx macd cci ao mom williamsr bullbear uo sma ema".split(" ");

module.exports = function(ind_type, params, callback) {
    if (!Indicators.includes(ind_type)) {
        var e1 = new Error("Indicator not supported: " + ind_type);
        return callback(e1, null);
    }
    
    return callback(null, "Received " + ind_type);
}
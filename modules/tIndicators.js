const tulind = require('tulind');

//Simple moving average
function tulindSMA(close, period){
  let priceResults;
  tulind.indicators.sma.indicator([close], [period], function(err, results) {
    priceResults = results;
  });
  return priceResults;
}

/*  Exponential Moving Average
    Type: overlay
    Input arrays: 1    Options: 1    Output arrays: 1 */
function tulindEMA(close, period){
  let priceResults;
    tulind.indicators.ema.indicator([close], [period], function(err, results){
  });
  return priceResults;
}

/*  Moving Average Convergence Divergence
    Input arrays: 1    Options: 3    Output arrays: 3
    Outputs: macd, macd_signal, macd_histogram */
function tulindMACD(close, shortPeriod, longPeriod, signalPeriod){
  let priceResults;
  tulind.indicators.macd.indicator([close], [shortPeriod, longPeriod, signalPeriod], function(err, results){
    priceResults = results;
  });
  return priceResults;
}

/*  Stochastic Oscillator
    Type: indicator
    Input arrays: 3    Options: 3    Output arrays: 2
    Inputs: high, low, close
    Options: %k period, %k slowing period, %d period
    Outputs: stoch_k, stoch_d */
function tulindStochOsc(high, low, close, kPeriod, slowingPeriod, dPeriod){
  let priceResults;
  tulind.indicators.stoch.indicator([high, low, close], [kPeriod, slowingPeriod, dPeriod], function(err, results){
    priceResults = results;
  })
  return priceResults;
}

/*  Relative Strength Index
    The Relative Strength Index is a momentum oscillator to help identify trends.
    Input arrays: 1    Options: 1    Output arrays: 1 */
function tulindRSI(close, period){
  let priceResults;
  tulind.indicators.rsi.indicator([close], [period], function(err, results){
    priceResults = results;
  });
  return priceResults;
}

/* Bollinger Bands
   Input arrays: 1    Options: 2    Output arrays: 3
   Options: period, stddev(Standard Deviation)
   Outputs: bbands_lower, bbands_middle, bbands_upper */
function tulindBB(close, period, stddev){
  let priceResults;
  tulind.indicators.bbands.indicator([close], [period, stddev], function(err, results){
    priceResults = results;
  })
  return priceResults;
}

module.exports = {
  tulindSMA,
  tulindEMA,
  tulindMACD,
  tulindRSI,
  tulindStochOsc,
  tulindBB
}
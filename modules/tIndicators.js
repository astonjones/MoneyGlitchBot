const tulind = require('tulind');

//Simple moving average
function tulindSMA(close, period){
  tulind.indicators.sma.indicator([close], [period], function(err, results) {
    console.log("Result of sma is:");
    console.log(results[0]);
  });
}

/*  Exponential Moving Average
    Type: overlay 
    Input arrays: 1    Options: 1    Output arrays: 1 */
function tulindEMA(close, period){
  tulind.indicators.ema.indicator([close], [period], function(err, results){
    console.log('Result of ema is:');
    console.log(results[0]);
  });
}

/*  Moving Average Convergence Divergence
    Input arrays: 1    Options: 3    Output arrays: 3
    Outputs: macd, macd_signal, macd_histogram */
function tulindMACD(close, shortPeriod, longPeriod, signalPeriod){
  tulind.indicators.macd.indicator([close], [shortPeriod, longPeriod, signalPeriod], function(err, results){
    console.log('Result of MACD is:');
    console.log(`Results 0 is ${results[0]}`);
    console.log(`Results 1 is ${results[1]}`);
  });
}

/*  Stochastic Oscillator
    Type: indicator
    Input arrays: 3    Options: 3    Output arrays: 2
    Inputs: high, low, close
    Options: %k period, %k slowing period, %d period
    Outputs: stoch_k, stoch_d */
function tulindStochOsc(high, low, close, kPeriod, slowingPeriod, dPeriod){
  tulind.indicators.stoch.indicator([high, low, close], [kPeriod, slowingPeriod, dPeriod], function(err, results){
    console.log("Results of stochastic oscillator is: ");
    console.log(`Result 0 is: ${results[0]}`);
    console.log(`Result 0 is: ${results[1]}`);
  })
}

/*  Relative Strength Index
    The Relative Strength Index is a momentum oscillator to help identify trends.
    Input arrays: 1    Options: 1    Output arrays: 1 */
function tulindRSI(close, period){
  tulind.indicators.rsi.indicator([close], [period], function(err, results){
    console.log('Results of RSI is:' )
    console.log(`Results of RSI is: ${results[0]}`);
  });
}

/* Bollinger Bands
   Input arrays: 1    Options: 2    Output arrays: 3
   Options: period, stddev(Standard Deviation)
   Outputs: bbands_lower, bbands_middle, bbands_upper */
function tulindBB(close, period, stddev){
  tulind.indicators.bbands.indicator([close], [period, stddev], function(err, results){
    console.log('Results of Bollinger bands is: ');
    console.log(`Results 0 is: ${results[0]}`);
    console.log(`Results 1 is: ${results[1]}`);
    console.log(`Results 2 is: ${results[2]}`);
  })
}

module.exports = {
  tulindSMA,
  tulindEMA,
  tulindMACD,
  tulindRSI,
  tulindStochOsc,
  tulindBB
}
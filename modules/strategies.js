const coinbaseApi = require('./api');
const moment = require('moment');
const tIndicators = require('./tIndicators');

//This function will check the MACD signals and 200 period signal and execute buy and sell trades.
async function MACDStrategy(){
    //initiates time and formats them
    let endDate = new Date();
    let startDate = new Date() - (130) * 60000; //NEED TO ADJUST TIME ACCORDING TO MACD PERIODS
    startDate = moment(startDate).format();
    endDate = moment(endDate).format();

    //get data from coinbase
    let priceData = await coinbaseApi.candleStickProduct('BTC-USD', startDate, endDate, 300);

    //process data through tulind indicators
    let output = await tIndicators.tulindMACD(priceData, 12, 26, 9);

    if(output[3] > 0){
        /* implement a long SMA period for historical data check
        let smaOutput = await tIndicators.tulindEMA(priceData, 200);
        if(smaOutput > latestPrice){
            LongENTRY();
        }
        */
    } else if(output[3] < 0){
        /* implement a long SMA period for historical data check
        let smaOutput = await tIndicators.tulindEMA(priceData, 200);
        if(smaOutput < latestPrice){
            ShortENTRY();
        }
        */
    }
}

module.exports = {
    MACDStrategy
  }
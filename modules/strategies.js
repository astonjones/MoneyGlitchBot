const coinbaseApi = require('./api');
const moment = require('moment');
const tIndicators = require('./tIndicators');

//This function will check the MACD signals and 200 period signal and execute buy and sell trades.
async function HourlyMACDStrategy(){
    //initiates time and formats
    let endDate = new Date();
    let startDateEMA = new Date().setHours(endDate.getHours() - 200); //200 EMA period for hours
    let startDateMACD = new Date().setHours(endDate.getHours() - 26); //26 MACD long period

    startDateEMA = moment(startDate).format();
    startDateMACD = moment(startDate).format();
    endDate = moment(endDate).format();

    //get data from coinbase
    let currentPrice = coinbaseApi.candleStickProduct('BTC-USD', endDate, endDate, 3600);
    let EMAPriceData = await coinbaseApi.candleStickProduct('BTC-USD', startDateEMA, endDate, 3600);
    let MACDPriceData = await coinbaseApi.candleStickProduct('BTC-USD', startDateMACD, endDate, 3600);

    //process data through tulind indicators
    let EMAOutput = await coinbaseApi.tulindEMA(EMAPriceData, 200);
    let MACDOutput = await tIndicators.tulindMACD(MACDPriceData, 12, 26, 9);

    //If last index of EMAoutput array is less than the price --- LOOK FOR GO LONG
    if(EMAOutput[EMAOutput.length - 1] > currentPrice){
        //IF MACD Crossover is below the zero line --- GO LONG ELSE, do nothing()
        if(MACDOutput[3][MACDOutput[3].length] < 0) { } //NEEDS ADJUSTMENT and strategy for how MACD lines work

    // If last index of EMAoutput array is greater than the price --- LOOK FOR SELL SHORT
    } else if(EMAOutput[EMAOutput.lengt] < currentPrice){
        //IF MACD crossover is above the zero line --- SELL SHORT
        if(MACDOutput[3][MACDOutput[3].length] > 0) { } //NEEDS ADJUSTMENT and strategy for how MACD lines work
    }
}

module.exports = {
    MACDStrategy
  }
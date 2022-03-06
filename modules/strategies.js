const coinbaseApi = require('./api');
const moment = require('moment');
const tIndicators = require('./tIndicators');

//This function will check the MACD signals and 200 period signal and execute buy and sell trades.
async function HourlyMACDStrategy(){
    //initiates time and formats
    let endDate = new Date();
    // let hourPast = new Date().setHours(endDate.getHours() - 1);
    let startDateEMA = new Date().setHours(endDate.getHours() - 200); //200 EMA period for hours
    let startDateMACD = new Date().setHours(endDate.getHours() - 26); //26 MACD long period

    startDateEMA = moment(startDateEMA).format();
    startDateMACD = moment(startDateMACD).format();
    endDate = moment(endDate).format();

    let hourPast = moment(endDate).subtract(1, 'hours').format();

    //get data from coinbase -- good to go
    let currentPrice = await coinbaseApi.candleStickProduct('BTC-USD', hourPast, endDate, 3600);
    let EMAPriceData = await coinbaseApi.candleStickProduct('BTC-USD', startDateEMA, endDate, 3600);
    // let MACDPriceData = await coinbaseApi.candleStickProduct('BTC-USD', startDateMACD, endDate, 3600);

    let EMAClosedPrices = EMAPriceData.map(item => item[1]);
    // let MACDClosedPrices = MACDPriceData.map(item => item[1])

    //process data through tulind indicators
    let EMAOutput = await tIndicators.tulindEMA(EMAClosedPrices, 200);
    // let MACDOutput = await tIndicators.tulindMACD(MACDClosedPrices, 12, 26, 9);

    if(EMAOutput[0][199] > currentPrice[0][1]) // EMA[0][199] for last EMA data index - currentPrice[0][1] for closed price on candlestick
    {
        console.log("The markets is bear");
    } else if(EMAOutput[0][199] < currentPrice[0][1]){
        console.log("THe markets is bull");
    } else {
        console.log("IDK");
    }
    return EMAOutput;
    // console.log(await MACDPriceData)

    //If last index of EMAoutput array is less than the price --- LOOK FOR GO LONG
    // if(EMAOutput[EMAOutput.length - 1] > currentPrice){
    //     //IF MACD Crossover is below the zero line --- GO LONG ELSE, do nothing()
    //     if(MACDOutput[3][MACDOutput[3].length] < 0) { } //NEEDS ADJUSTMENT and strategy for how MACD lines work

    // // If last index of EMAoutput array is greater than the price --- LOOK FOR SELL SHORT
    // } else if(EMAOutput[EMAOutput.lengt] < currentPrice){
    //     //IF MACD crossover is above the zero line --- SELL SHORT
    //     if(MACDOutput[3][MACDOutput[3].length] > 0) { } //NEEDS ADJUSTMENT and strategy for how MACD lines work
    // }
}

module.exports = {
    HourlyMACDStrategy
  }
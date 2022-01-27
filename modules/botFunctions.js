const moment = require('moment');
const coinbaseApi = require('./api');
const Candlestick = require('./models/Candlestick');
const mongoDB = require('./mongoDB');
const tindicators = require('./tIndicators');

//Get candleStick data *GRANULARITY SET TO 300*
async function candleStickTick(product_id, startDate, endDate, collection){ 
    startDate = moment(startDate).format();
    endDate = moment(endDate).format();

    let data = await coinbaseApi.candleStickProduct(product_id, startDate, endDate, 300); //granularity set here as int

    let stringDate = moment(endDate).format("YYYY:MM:DD HH:mm:ss");
    let candleStick = new Candlestick(stringDate, data[0]);
    await mongoDB.insertCandlestickData(candleStick, collection)
}

async function checkData(){
    let closePrices = [];
    let timestamps = [];
    let period = 3;

    let endDate = new Date();
    let startDate = new Date() - (130) * 60000; //Now minus 130 minutes

    startDate = moment(startDate).format();
    endDate = moment(endDate).format();
    console.log(`Start date is ${startDate}`);
    console.log(`End date is ${endDate}`);

    let dataArray = await coinbaseApi.candleStickProduct('BTC-USD', startDate, endDate, 300);

    //pushed the closing prices
    dataArray.forEach(item =>{
        timestamps.push(item[0]);
        closePrices.push(item[4]);
    })

    //HERE YOU CAN USE DIFFERENT TULIND INDICATORS
    try{
        // return { timestamps: timestamps.splice((period - 1)), closingPrices: tindicators.tulindSMA(closePrices, period) };
        return { timestamps: timestamps.splice((5 - 1)), closingPrices: tindicators.tulindMACD(closePrices, 2, 5, 9) };
    }catch(err){
        console.log(`Error in checkData Function() -- ${err}`);
    }

}

module.exports = {
    candleStickTick,
    checkData
}
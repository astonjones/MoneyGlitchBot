const moment = require('moment');
const coinbaseApi = require('./api');
const Candlestick = require('./models/Candlestick');
const mongoDB = require('./mongoDB');
const tindicators = require('./tIndicators');

//Get candleStick data *GRANULARITY SET TO 300*
async function storeCandleStick(product_id, startDate, endDate, collection){
    startDate = moment(startDate).format();
    endDate = moment(endDate).format();

    let data = await coinbaseApi.candleStickProduct(product_id, startDate, endDate, 300); //granularity set here as int

    let stringDate = moment(endDate).format("YYYY:MM:DD HH:mm:ss");
    let candleStick = new Candlestick(stringDate, data[0]);
    await mongoDB.insertCandlestickData(candleStick, collection)
}

//This is a test function to process price data through TIs
async function checkData(){
    let output = [];
    let timestamps = [];
    let period = 5;

    //Initiate dates and format them
    let endDate = new Date();
    let startDate = new Date() - (130) * 60000; // Now - 130 minutes
    startDate = moment(startDate).format();
    endDate = moment(endDate).format();

    let dataArray = await coinbaseApi.candleStickProduct('BTC-USD', startDate, endDate, 300);

    //pushed the closing prices
    dataArray.forEach(item =>{
        timestamps.push(item[0]);
        output.push(item[4]);
    })

    try{
        //HERE YOU CAN USE DIFFERENT TULIND INDICATORSx

        // return { timestamps: timestamps.splice((period - 1)), output: tindicators.tulindSMA(output, period) };
        return { timestamps: timestamps.splice((period - 1)), output: tindicators.tulindMACD(output, 2, 5, 9) };
    }catch(err){
        console.log(`Error in checkData Function() -- ${err}`);
    }

}

module.exports = {
    storeCandleStick,
    checkData
}
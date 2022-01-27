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
    let close = [];

    let endDate = new Date();
    let startDate = new Date() - (130) * 60000; // Now - 130 minutes

    startDate = moment(startDate).format();
    endDate = moment(endDate).format();

    let dataArray = await coinbaseApi.candleStickProduct('BTC-USD', startDate, endDate, 300);
    dataArray.foreach(item =>{
        close.push(item);
    })

    try{
        console.log(dataArray);
        tindicators.tulindSMA(close, 3);
    }catch(err){
        console.log(`Error in checkData Function() -- ${err}`);
    }

}

module.exports = {
    candleStickTick,
    checkData
}
const moment = require('moment');
const coinbaseApi = require('./api');
const Candlestick = require('./models/Candlestick');
const mongoDB = require('./mongoDB');

//Get candleStick data *GRANULARITY SET TO 300*
async function candleStickTick(product_id, startDate, endDate, collection){  
    startDate = await moment(startDate).format();
    endDate = await moment(endDate).format();

    let data = await coinbaseApi.candleStickProduct(product_id, endDate, startDate, 300); //granularity set here as int

    let stringDate = moment(endDate).format("YYYY:MM:DD HH:mm:ss");
    let candleStick = new Candlestick(stringDate, data[0]);
    await mongoDB.insertCandlestickData(candleStick, collection)
}

//get candlestick data from 26 periods

module.exports = {
    candleStickTick
}
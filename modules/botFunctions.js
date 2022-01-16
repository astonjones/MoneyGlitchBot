const moment = require('moment');
const coinbaseApi = require('./api');
const Candlestick = require('./models/Candlestick');
const sql = require('./sql');

//Get candleStick data *GRANULARITY SET TO 300*
async function candleStickTick(product_id, startDate, endDate, table){  
    startDate = await moment(startDate).format();
    endDate = await moment(endDate).format();

    let data = await coinbaseApi.candleStickProduct(product_id, endDate, startDate, 300); //granularity set here as int

    var stringDate = moment(endDate).format("YYYY:MM:DD HH:mm:ss");
    var candleStick = new Candlestick(stringDate, data[0]);
    
    sql.postETHCandleData(candleStick, table);
}

module.exports = {
    candleStickTick
}
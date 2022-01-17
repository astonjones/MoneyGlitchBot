require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const http = require('http');
const moment = require('moment');
const coinbaseApi = require('./modules/api.js');
const Candlestick = require('./modules/models/Candlestick');
const bot = require('./modules/botFunctions'); //general bot functions module
const mongoDB = require('./modules/mongoDB');


const app = express();
const PORT = process.env.PORT || 5000
const server = http.createServer(app).listen(PORT, () => console.log(`Listening on ${PORT}`));

//gets a start date of 
let startDate = new Date() - 5 * 60000; //Right now - 5 minutes
let endDate = new Date(); // Right now

startDate = moment(startDate).format();
endDate = moment(endDate).format();

//This is the main function -- Right now it logs candlestick data to a mongodb
async function main(){
    try{ await mongoDB.connectMongoDB() } 
    catch(err){ console.log(`error in main function ${err}`) }
    
    try{
        await bot.candleStickTick('DOGE-USD', startDate, endDate, 'DOGE_Candlestick_Data')
        await bot.candleStickTick('ETH-USD', startDate, endDate, 'ETH_Candlestick_Data');
        await bot.candleStickTick('ENJ-USD', startDate, endDate, 'ENJ_Candlestick_Data');
        await bot.candleStickTick('GALA-USD', startDate, endDate, 'GALA_Candlestick_Data');
        await bot.candleStickTick('REQ-USD', startDate, endDate, 'REQ_Candlestick_Data');
        await bot.candleStickTick('IOTX-USD', startDate, endDate, 'IOTEX_Candlestick_Data');
        await bot.candleStickTick('LINK-USD', startDate, endDate, 'LINK_Candlestick_Data');
        await bot.candleStickTick('LRC-USD', startDate, endDate, 'LRC_Candlestick_Data');
    } 
    catch(err) { console.log(`An error in the main function occured: ${err}`) }
    await mongoDB.closeMongoDB();
}


// Check markets every n seconds
const POLLING_INTERVAL = process.env.POLLING_INTERVAL || 300000 // 3 Seconds
priceMonitor = setInterval(async () => { await main() }, POLLING_INTERVAL)

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const http = require('http');
const moment = require('moment');
const coinbaseApi = require('./modules/api.js');
const sql = require('./modules/sql');
const Candlestick = require('./modules/models/Candlestick');
const bot = require('./modules/botFunctions'); //general bot functions module

const app = express();
const PORT = process.env.PORT || 5000
const server = http.createServer(app).listen(PORT, () => console.log(`Listening on ${PORT}`));

let startDate = new Date() - 5 * 60000;
let endDate = new Date();

/*
    bot.candleStickTick('ETH-USD', startDate, endDate, 'ETH_Candlestick_Data');
    bot.candleStickTick('DOGE-USD', startDate, endDate, 'DOGE_Candlestick_Data');
    bot.candleStickTick('ENJ-USD', startDate, endDate, 'ENJ_Candlestick_Data');
    bot.candleStickTick('GALA-USD', startDate, endDate, 'GALA_Candlestick_Data');
    bot.candleStickTick('REQ-USD', startDate, endDate, 'REQ_Candlestick_Data');
    bot.candleStickTick('IOTEX-USD', startDate, endDate, 'IOTEX_Candlestick_Data');
    bot.candleStickTick('LINK-USD', startDate, endDate, 'LINK_Candlestick_Data');
    bot.candleStickTick('LRC-USD', startDate, endDate, 'LRC_Candlestick_Data');
*/

// Check markets every n seconds
// const POLLING_INTERVAL = process.env.POLLING_INTERVAL || 3000 // 3 Seconds
// priceMonitor = setInterval(async () => { checkBTCPrice() }, POLLING_INTERVAL)

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const http = require('http');
const moment = require('moment');
const Candlestick = require('./modules/models/Candlestick');
const bot = require('./modules/botFunctions'); //general bot functions module
const tulind = require('tulind');
const strategies = require('./modules/strategies');
const krakenApi = require('./modules/KrakenApi.js');
const app = express();
const PORT = process.env.PORT || 5000
const server = http.createServer(app).listen(PORT, () => console.log(`Listening on ${PORT}`));
app.use(cors());

// Check markets every n milliseconds
// const POLLING_INTERVAL = process.env.POLLING_INTERVAL || 300000
// priceMonitor = setInterval(async () => { await main() }, POLLING_INTERVAL)


main();
function main() {
    /*
    1.) read through historical data
    
    2.) process data through algorithm
        - define algorithm
        - algorithm tells when to go long or short

    3.) Do nothing or Buy

    */
    return null
};

/// ---------------- Random endpoints ---------------------------
app.get('/SMAData', async function(req, res){
    const array = await strategies.MACDStrategy();
    res.send(array);
});

app.get('/teststrategy', async function(req, res){
    let data = await strategies.HourlyMACDStrategy()
    res.send(data);
});
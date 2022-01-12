require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const http = require('http');

const app = express();
const PORT = process.env.PORT || 5000
const server = http.createServer(app).listen(PORT, () => console.log
(`Listening on ${PORT}`))

// Check markets every n seconds
const POLLING_INTERVAL = process.env.POLLING_INTERVAL || 3000 // 3 Seconds
priceMonitor = setInterval(async () => { console.log("Loading") }, POLLING_INTERVAL)
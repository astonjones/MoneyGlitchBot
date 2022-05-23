const key          = process.env.API_KEY; // API Key
const secret       = process.env.PRIVATE_KEY; // API Private Key
const KrakenClient = require('kraken-api');
const kraken       = new KrakenClient(key, secret);

//This function return 720 candlesticks of the latest pair listed. Or return candlestick between time specified time frame.
async function OHLCTest(){
	let OHLCData = await kraken.api('OHLC', { pair: 'XBTUSD'});
	console.log(OHLCData.result.XXBTZUSD)
}

module.exports = {
	OHLCTest
}
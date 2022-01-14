const axios = require('axios');

function tickBTC() {
  axios.get('https://api.exchange.coinbase.com/products/BTC-USD/ticker')
  .then(res => { console.log(res.data) })
  .catch(err => { console.log(err)})
}

function statsBTC() {
  axios.get('https://api.exchange.coinbase.com/products/BTC-USD/stats')
  .then(res => { return res })
  .catch(err => { console.log(err)})
}

function executeTrade() {
  const result = axios.post()
}

module.exports = {
  tickBTC
}
const axios = require('axios');

async function tickBTC() {
  return await axios.get('https://api.exchange.coinbase.com/products/BTC-USD/ticker')
}

async function statsBTC() {
  return await axios.get('https://api.exchange.coinbase.com/products/BTC-USD/stats')
}

async function executeTrade() {
  const options = {
    method: 'POST',
    url: 'https://api.exchange.coinbase.com/orders',
    headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
    data: {
      profile_id: 'default profile_id',
      type: 'limit',
      side: 'buy',
      stp: 'dc',
      stop: 'loss',
      time_in_force: 'GTC',
      cancel_after: 'min',
      post_only: 'false'
    }
  };
  return await axios.request(options);
}

module.exports = {
  tickBTC
}
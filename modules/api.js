const axios = require('axios');

async function tickProduct(product_id) {
  const response = await axios.get(`https://api.exchange.coinbase.com/products/${product_id}/ticker`)
  return response.data
}

async function statsProduct(product_id) {
  return await axios.get(`https://api.exchange.coinbase.com/products/${product_id}/stats`).then(res => console.log(res.data));
}

//NEED TO INTAKE (ProductId, granularity, startTime, endTime) as parameters
async function candleStickProduct(product_id, end, start, gran){
  const response = await axios.get(`https://api.exchange.coinbase.com/products/${product_id}/candles?granularity=${gran}&start=${start}&end=${end}`)
  return response.data
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
  tickProduct,
  candleStickProduct
}
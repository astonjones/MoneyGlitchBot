class Ticker {
    constructor({
      trade_id, size, bid, ask, time = new Date(), volume, price
    }) {
    this.trade_id = trade_id
      this.time = time
      this.size = size
      this.price = price
      this.bid = bid
      this.ask = ask
      this.volume = volume
    }

  }
  
  module.exports = exports = Ticker
  
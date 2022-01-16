//This is a class/object of a candlestick data structure

class Candlestick {
    constructor(timeStamp, [
      time, low, high, open, close, volume
    ]) {
      this.timeStamp = timeStamp;
      this.time = time
      this.low = low
      this.high = high
      this.open = open
      this.close = close
      this.volume = volume
    }
  
    average() {
      return (this.close + this.high + this.low) / 3
    }

    returnArray(){
      return [this.timeStamp,
        this.time,
        this.low,
        this.high,
        this.open,
        this.close,
        this.volume]
    }

  }
  
  module.exports = exports = Candlestick
  
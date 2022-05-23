const moment = require('moment');
const tIndicators = require('./tIndicators');

// Self built algorithm/strategies
function MACD_EMA_Strategy(data){
    const emaSignal = tIndicators.tulindEMA(close, period);
    const macdSignal = tIndicators.tulindMACD(close, period);

    if(emaSignal > 1 && macdSignal > 1){
        return "long"
    }

    return null
}

module.exports = {

}
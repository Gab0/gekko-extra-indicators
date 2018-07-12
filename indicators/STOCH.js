// Stochastic Oscillator Slow - STOCH
// Ported by Gab0 march-2018
// ref http://www.tadoc.org/indicator/STOCH.htm
// Added Smooth K, set to 1 to disable
// Takes 5-6 candles for K % D calculations to catch up initially??
// Added - if (candle.high !== candle.low), to stop NaN values in K&D when no exchange data

var SMA = require('./SMA');
var _ = require('lodash');

var Indicator = function(settings) {
    this.input = 'candle';
    this.prices = [];
    this.result = 0;
    this.age = 0;
    this.sum = 0;
    this.K =0;
    this.D =0;
    this.candles = [];
    this.KPeriods = settings.KPeriods;

    this.KMA = new SMA(settings.DPeriods);
    this.smoothK = new SMA(settings.smoothKPeriods);

}

Indicator.prototype.getLowest = function()
{
    var low = 99999;
    for (var i=0; i < this.candles.length;i++){
        if (this.candles[i].low < low)
        {
            low = this.candles[i].low;

        }


    }

    return low;

}
Indicator.prototype.getHighest = function()
{
    var high = 0;
    for (var i=0; i < this.candles.length;i++){
        if (this.candles[i].high > high)
        {
            high= this.candles[i].high;

        }


    }

    return high;

}

Indicator.prototype.update = function(candle) {

    if (candle.high !== candle.low)
    {

    this.candles.push(candle);
    if (this.candles.length > this.KPeriods)
        this.candles.shift();


    var LL = this.getLowest();
    var HH = this.getHighest()

    


    var K = candle.close - LL;
    K = K / (HH - LL) * 100;

    this.smoothK.update(K)

    var smoothD = this.smoothK.result
    this.KMA.update(smoothD);

    this.K = this.smoothK.result;
    this.D = this.KMA.result;
    }
}

module.exports = Indicator;

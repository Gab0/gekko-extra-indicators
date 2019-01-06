//MFI indicator by Gab0 - 04/jan/2019;

var SMA = require('./SMA');

var Indicator = function(settings) {
    this.input = 'candle';

    this.result = NaN;
    this.age = 0;


    this.lastPrice = -1;

    this.timePeriod = settings.optInTimePeriod;

    this.posHist = [];
    this.negHist = [];
};

Indicator.prototype.sum = function(a, b) {
    return a + b;
};

Indicator.prototype.update = function(candle) {

    var medianPrice = (candle.high + candle.low + candle.close) / 3.0;

    var moneyFlow = medianPrice * candle.volume;

    if (this.lastPrice < 0)
    {
        this.lastPrice = medianPrice;
    }

    if (medianPrice > this.lastPrice)
    {
        this.posHist.push(moneyFlow);
        this.negHist.push(0.0);
    }
    else if (medianPrice < this.lastPrice)
    {
        this.posHist.push(0.0);
        this.negHist.push(moneyFlow);
    }
    else 
    {
        this.posHist.push(0.0);
        this.negHist.push(0.0);
    }

    this.lastPrice = medianPrice;

    //this.record.push(moneyFlow);

    if ((this.posHist.length) > this.timePeriod)
    {
        this.posHist.shift();
        this.negHist.shift();
        var posSum = this.posHist.reduce(this.sum, 0);
        var negSum = this.negHist.reduce(this.sum, 0);

        this.result = posSum / (posSum + negSum) * 100.0;

    }


};

module.exports = Indicator;

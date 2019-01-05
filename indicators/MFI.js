//MFI indicator by Gab0 - 04/jan/2019;

var SMA = require('./SMA');

var Indicator = function(settings) {
    this.input = 'candle';

    this.result = 0;
    this.age = 0;


    this.lastFlow = -6435;

    this.timePeriod = settings.optInTimePeriod;

    this.posHist = [];
    this.negHist = [];
};

Indicator.prototype.sum = function(a, b) {
    return a + b;
};

Indicator.prototype.update = function(candle) {

    var medianPrice = (candle.high + candle.low + candle.close) / 3;

    var moneyFlow = medianPrice * candle.volume;

    if (this.lastFlow == -6435)
    {
        this.lastFlow = moneyFlow;
    }

    if (moneyFlow > this.lastFlow)
    {
        this.posHist.push(moneyFlow);
        this.negHist.push(0.0);
    }
    else if (moneyFlow < this.lastFlow)
    {
        this.posHist.push(0.0);
        this.negHist.push(moneyFlow);
    }
    else if (moneyFlow == this.lastFlow)
    {
        this.posHist.push(0.0);
        this.negHist.push(0.0);
    }

    this.lastFlow = moneyFlow;

    //this.record.push(moneyFlow);

    if ((this.posHist.length) > this.timePeriod)
    {
        var posSum = this.posHist.reduce(this.sum, 0);
        var negSum = this.negHist.reduce(this.sum, 0);

        this.result = posSum / (posSum + negSum) * 100.0;

        this.posHist.shift();
        this.negHist.shift();
    }


};

module.exports = Indicator;

//PDO indicator by Gab0 - 06/jan/2019;
// Settings
//   optInTimePeriod: SMA Time Period;

var SMA = require("../SMA");

var Indicator = function(settings) {
    this.input = 'price';

    this.result = NaN;
    this.age = 0;
    this.period = settings.optInTimePeriod;

    this.sma = SMA(this.period);
};

Indicator.prototype.update = function(price) {

    this.sma.update(price);

    if (this.age > this.period)
        this.result = 100 * (price - this.sma.result) / this.sma.result;

    this.age++;
};

module.exports = Indicator;

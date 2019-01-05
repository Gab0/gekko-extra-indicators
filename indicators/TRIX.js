//TRIX indicator by Gab0 - 04/jan/2019;

var EMA = require('./EMA');

var Indicator = function(settings) {
    this.input = 'price';

    this.result = 0;
    this.age = 0;


    this.mainema = new EMA(settings.optInTimePeriod);
    this.secondema = new EMA(settings.optInTimePeriod);
    this.thirdema = new EMA(settings.optInTimePeriod);

    this.mainEmaBuffer = 0;

    this.readyPeriods = settings.optInTimePeriod + 1;
    this.lastSmoothedEma = 0;
};

Indicator.prototype.update = function(price) {

    this.mainema.update(price);
    this.secondema.update(this.mainema.result);
    this.thirdema.update(this.secondema.result);

    if (this.age > this.readyPeriods)
        this.result = this.thirdema.result / this.lastSmoothedEma * 100;

    this.lastSmoothedEma = this.thirdema.result;
};

module.exports = Indicator;

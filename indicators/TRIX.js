//TRIX indicator by Gab0 - 04/jan/2019;

var EMA = require('./EMA');

var Indicator = function(settings) {
    this.input = 'price';

    this.result = 0;
    this.age = 0;


    this.mainema = new EMA(settings.optInTimePeriod);
    this.secondema = new EMA(settings.optInTimePeriod);
    this.thirdema = new EMA(settings.optInTimePeriod);


    this.period = settings.optInTimePeriod;

    this.readyPeriods = 2 / (settings.optInTimePeriod + 1);
    this.lastSmoothedEma = 0;
};

Indicator.prototype.update = function(price) {

    this.age++;

    this.mainema.update(price);
    this.secondema.update(this.mainema.result);
    this.thirdema.update(this.secondema.result);

    var ressecondema = 0;
    var resthirdema = 0;

    // Strange code... Copied from Tulind C implementation.
    if (this.age == this.period - 1)
    {
        ressecondema = this.mainema.result;
    } else if (this.age > this.period - 1)
    {
        ressecondema = this.secondema.result;

        if (this.age == this.period * 2 -2)
        {

            resthirdema = ressecondema;
        }
        else if (this.age > this.period * 2 - 2)
        {
            resthirdema = this.thirdema.result;
        }

    }


    if (this.age > this.period * 2 - 2)
    {
        this.result = (resthirdema - this.lastSmoothedEma) / resthirdema * 100;
        //this.result = (this.thirdema.result - this.lastSmoothedEma) * 100;
    }
    this.lastSmoothedEma = resthirdema;
};

module.exports = Indicator;

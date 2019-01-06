//TRIX indicator by Gab0 - 05/jan/2019;

var EMA = require('./EMA');

var Indicator = function(settings) {
    this.input = 'price';

    this.result = NaN;
    this.age = 0;

    this.period = settings.optInTimePeriod;

    this.mainema = new EMA(this.period);
    this.secondema = new EMA(this.period);
    this.thirdema = new EMA(this.period);

};

Indicator.prototype.update = function(price) {

    this.age++;

    this.mainema.update(price);

    // THIS IS AFTER INDICATOR IS ONLINE;
    if (this.age > (this.period * 3 - 2))
    {
        this.secondema.update(this.mainema.result);

        var lastSmoothEma = this.thirdema.result;

        this.thirdema.update(this.secondema.result);

        this.result = (this.thirdema.result - lastSmoothEma) / this.thirdema.result * 100;

    }

    // THIS IS BEFORE INDICATOR IS ONLINE;
    else
    {

        // EMA updates are gradual on the first periods.
        if (this.age > this.period - 1)
        {

            this.secondema.update(this.mainema.result);

            if (this.age > this.period * 2 - 2)
            {
                this.thirdema.update(this.secondema.result);
            }
            
        }


    }
};
    module.exports = Indicator;

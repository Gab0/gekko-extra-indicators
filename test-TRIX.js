var method = {};

method.init = function() {

    this.name = "TALib-port-tester";


    var TRIXSettings= {
        optInTimePeriod: 15,
    };

    this.addIndicator('ind', 'TRIX', TRIXSettings);
    this.addTulipIndicator("tulipind", "trix", TRIXSettings);

};


method.check = function() {};
method.update= function(candle) {

    var TRIX = this.indicators.ind.result;
    var TTRIX = this.tulipIndicators.tulipind.result;

    console.log(this.age);

	  console.log('TRIX>> ' + TRIX);
    console.log('TULIP TRIX>> ' + TTRIX['result']);
    console.log('\n');
};

method.log = function() {};

module.exports = method;

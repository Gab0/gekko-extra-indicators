var method = {};

method.init = function() {

    this.name = "TALib-port-tester";


    var EMVSettings= {
        optInTimePeriod: 15
    };

    this.addIndicator('ind', 'EMV', EMVSettings);
    this.addTulipIndicator("tulipind", "emv", EMVSettings);

};


method.check = function() {};
method.update= function(candle) {

    var EMV = this.indicators.ind.result;
    var TEMV = this.tulipIndicators.tulipind.result;

    console.log(this.age);

	  console.log('EMV>> ' + EMV);
    console.log('TULIP EMV>> ' + TEMV['result']);
    console.log('\n');
};

method.log = function() {};

module.exports = method;

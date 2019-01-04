var method = {};

method.init = function() {

    this.name = "TALib-port-tester";


    var DPOSettings= {
        optInTimePeriod: 5,
    };

    var TDPOSettings = {
        optInTimePeriod: 5
    };
    this.addIndicator('ind', 'DPO', DPOSettings);
    this.addTulipIndicator("tulipind", "dpo", TDPOSettings);
};


method.check = function() {};
method.update= function(candle) {

    var DPO = this.indicators.ind.result;
    var TDPO = this.tulipIndicators.tulipind.result;

	  console.log('DPO>> ' + DPO);
    console.log('TULIP DPO>> ' + TDPO['result']);
    console.log('\n');

};

method.log = function() {};

module.exports = method;

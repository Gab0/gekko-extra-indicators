var method = {};

method.init = function() {

    this.name = "TALib-port-tester";


    var MFISettings= {
        optInTimePeriod: 14
    };

    var TMFISettings = {
        optInTimePeriod: 14
    };


    this.addIndicator('ind', 'MFI', MFISettings);
    this.addTulipIndicator("tulipind", "mfi", TMFISettings);
};


method.check = function() {};
method.update= function(candle) {

    var MFI = this.indicators.ind.result;
    var TMFI = this.tulipIndicators.tulipind.result;

	  console.log('MFI>> ' + MFI);
    console.log('TULIP MFI>> ' + TMFI['result']);
    console.log('\n');

};

method.log = function() {};

module.exports = method;

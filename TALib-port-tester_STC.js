var method = {};

method.init = function() {

    this.name = "TALib-port-tester";


var STCSettings= {
    short: 20,
    long: 2,
    signal: 2,
    cycle: 9,
    smooth: 0.5
}

var TASMASettings = {

       optInTimePeriod: 14,

}
    this.addIndicator('ind', 'STC', STCSettings);
    //this.addTalibIndicator("tind", "stc", TASMASettings);
    //this.addTulipIndicator("tuind", "stc", TASMASettings);
};


method.check = function() {};
method.update= function(candle) {

var STC = this.indicators.ind.result;

	console.log('STC>> ' + STC);

    //console.log(this.tulipIndicators.tuind.result);
    //console.log(this.talibIndicators.tind.result);

};
method.log = function() {};

module.exports = method;

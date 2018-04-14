var method = {};

method.init = function() {

    this.name = "TALib-port-tester";

    this.addIndicator('ind', 'DMI', 7);
    this.addTalibIndicator("tind", "adx", {optInTimePeriod: 7});
    this.addTalibIndicator("tindp", "plus_dm", {optInTimePeriod: 7});
    this.addTalibIndicator("tindm", "minus_dm", {optInTimePeriod: 7});
    //this.addTulipIndicator("tuind", "adx", {optInTimePeriod: 7});

};

method.check = function() {};
method.update= function(candle) {

    console.log('>ADX ', this.indicators.ind.result);
    console.log('>UP ', this.indicators.ind.DIup);
    console.log('>DOWN ', this.indicators.ind.DIdown);
    console.log(this.talibIndicators.tind.result);
    console.log(this.talibIndicators.tindp.result);
    console.log(this.talibIndicators.tindm.result);
	  //console.log(this.tulipIndicators.tuind.result);

};
method.log = function() {};

module.exports = method;

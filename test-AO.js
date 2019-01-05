var method = {};

method.init = function() {

    this.name = "TALib-port-tester";


var AOSettings= {
    short: 5,
    long: 34,
}

var TAOSettings = {
}
    this.addIndicator('ind', 'AO', AOSettings);
    this.addTulipIndicator("tulipind", "ao", TAOSettings);
};


method.check = function() {};
method.update= function(candle) {

    var AO = this.indicators.ind.result;
    var TAO = this.tulipIndicators.tulipind.result;

	  console.log('AO>> ' + AO);
    console.log('TULIP AO>> ' + TAO['result']);
    console.log('\n');

};

method.log = function() {};

module.exports = method;

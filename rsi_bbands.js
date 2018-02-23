// Strategy Combining RSI and MACD
// Adapted for japonicus usage;
//var log = require('../core/log.js');
var method = {};

/*
JAPONICUS CONFIGS
"rsi_bbands": {

"NbDevUp": 2,
"NbDevDn": 2,
"TimePeriod": 9,
"rsi_high": 60,
"rsi_low": 20,
"min_hold": 5,
"swing_trade": 0.5

}

*/

// Prepare everything our method needs
method.init = function() {
  this.name = 'rsi-bbands'
  // keep state about the current trend
  // here, on every new candle we use this
  // state object to check if we need to
  // report it.
  this.currently_invested = false;
  this.entry_price = 0;

  this.min_hold = this.settings.min_hold;
  this.time_since_last_trade = 100;

  // how many candles do we need as a base
  // before we can start giving advice?
  this.requiredHistory = this.tradingAdvisor.historySize;

  var swing_trade = Math.round(this.settings.swing_trade);

  // define the indicators we need
  this.addIndicator('myrsi', 'RSI', this.settings);
  this.addIndicator('mybb', 'BB', this.settings);
}

// What happens on every new candle?
/*
method.update = function(candle) {
	
    this.bb_l = this.tulipIndicators.mybb.result.bbandsLower;
    this.bb_m = this.tulipIndicators.mybb.result.bbandsMiddle;
    this.bb_u = this.tulipIndicators.mybb.result.bbandsUpper;
    this.rsi = this.indicators.myrsi.result.result; 
}
*/
method.log = function() {
//log.debug(
//`---------------------
//RSI Calc: ${this.rsi}
//Time since last: ${this.time_since_last_trade}
//Currently Invested? ${this.currently_invested}
//Entry Price: ${this.entry_price}
//Stop loss: ${this.settings.thresholds.stop_loss}
//BB Upper: ${this.tulipIndicators.mybb.result.bbandsUpper}
//BB Middle: ${this.tulipIndicators.mybb.result.bbandsMiddle}
//BB Lower: ${this.tulipIndicators.mybb.result.bbandsLower}
//${this.settings.parameters.optInNbStdDevs}
//${this.settings.parameters.optInTimePeriod}
//${this.settings.thresholds.rsi_high}
//${this.settings.thresholds.rsi_low}
//${this.settings.thresholds.min_hold}
//`);
}

// Based on the new information, check if we should update
// trading advice.
method.check = function(candle) {

  // Get the signals 
  var price = candle.close;

  var bb = this.indicators.mybb;
  var bb_l = bb.lower;
  var bb_m = bb.middle;
  var bb_u = bb.upper;

  var rsi_high = this.settings.rsi_high;
  var rsi_low = this.settings.rsi_low;
  var rsi_now = this.indicators.myrsi.result;  
  var stop_loss = this.settings.stop_loss;
  var min_hold = this.settings.min_hold;
  var swing_trade = this.settings.swing_trade;

  var new_trade = 0; // change to 1 for buy or -1 for sell
  // Strategy: 
  
  switch (swing_trade) {
    case 1:
      if( this.currently_invested == false ) {
      // Check if we should buy
      // First, has it been long enough? 
       // log.debug(`Current px... ${price}`);
        if (this.time_since_last_trade < min_hold) {
          new_trade = 0;  // Don't do anything
          //log.debug(`Do Nothing`);
        } else if (price <= bb_l && rsi_now <= rsi_low) {
        // If so, did the signal cross? Are we (optionally) below RSI threshold
            new_trade = 1; // Buy 
            //log.debug(`Buy Signal`);
        }
      } else if (this.currently_invested == true)  {
        // Check if we should sell 
        // First, update floating PL
        var floating_pl = (price/this.entry_price)-1;
          // log.debug(`Floating PL: ${floating_pl}`);
        // Did we hit stop loss?
        if (floating_pl <= stop_loss) {
         // log.debug(`Sell signal - stop loss`);
          new_trade = -1; 
         // log.debug(`Floating PL: ${floating_pl}`);
        } else if (this.time_since_last_trade > min_hold && price >= bb_m ) {
        // If we have waited long enough, and got cross
          new_trade = -1;
        //  log.debug(`Sell signal - Signal cross`);
        }
      }
    break;
    case 0:
      if( this.currently_invested == false ) {
      // Check if we should buy
      // First, has it been long enough? 
       //log.debug(`Current px... ${price}`);
        if (this.time_since_last_trade < min_hold) {
          new_trade = 0;  // Don't do anything
         // log.debug(`Do Nothing`);
        } else if (price >= bb_u && rsi_now <= rsi_high) {
        // If so, did the signal cross? Are we (optionally) below RSI threshold
            new_trade = 1; // Buy 
           // log.debug(`Buy Signal`);
        }
      } else if (this.currently_invested == true)  {
        // Check if we should sell 
        // First, update floating PL
        var floating_pl = (price/this.entry_price)-1;
        //   log.debug(`Floating PL: ${floating_pl}`);
        // Did we hit stop loss?
        if (floating_pl <= stop_loss) {
        //  log.debug(`Sell signal - stop loss`);
          new_trade = -1; 
        //  log.debug(`Floating PL: ${floating_pl}`);
        } else if (this.time_since_last_trade > min_hold && price <= bb_l ) {
        // If we have waited long enough, and got cross
          new_trade = -1;
        //  log.debug(`Sell signal - Signal cross`);
        }
      }
    break;
  }

  // Execute the trade if needed
  if (new_trade == 1) {
    //log.debug(`Execute Buy`);
    this.advice('long');
    this.entry_price = price;
    this.currently_invested = true;
    this.time_since_last_trade = 0;
  } else if (new_trade == -1) {
    //log.debug(`Execute Sell`);
    this.advice('short');
    this.entry_price = 0;
    this.currently_invested = false;
    this.time_since_last_trade = 0;
  } else {
    this.advice();
  }

  // Update state variables
  this.time_since_last_trade++ 

}

module.exports = method;

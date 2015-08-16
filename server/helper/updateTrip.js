var nest = require('./nest');
var weather = require('./weather');
var request = require('superagent');
var twilio = require('./twilio');
/**
 * When you start or leave a vacation.
 * @param  {Object} flight   The json object of the flight details
 * @param  {[type]} startEnd 'start' or 'end' (i.e. start of vacation)
 */
module.exports = function(flight, startEnd) {
  if (startEnd === 'start') {
    // Change temperature to non-freezing
    nest.getZip(function(err, zip) {
      weather.getTemperature(zip, function(err, avgTemp) {
        if (avgTemp < 50) {
          // Set to heat at target 50
          request
            .put('https://developer-api.nest.com/devices/thermostats/z3WfD_k2XQFwte0Yz9jf7ow3-aqdy0De?auth=c.62NNoDDdtN2goM9hiBpVL4S8JtUjo0deSqp48VvP4jnjG8en1sWDkXthjubMvxMlszVMkwiBxtQWyrhrd3ovrIBVklZMcmKBF8goYQo2rmZfXNqOQtWhAw8dFaSoQ10pyNzCHAG2I2CMmeG6')
            .send({"hvac_mode": "heat", "target_temperature_f": 50})
            .set('Accept', 'application/json')
            .end(function(err, res){
            });
        } else {
          // Turn off hvac
          request
            .put('https://developer-api.nest.com/devices/thermostats/z3WfD_k2XQFwte0Yz9jf7ow3-aqdy0De?auth=c.62NNoDDdtN2goM9hiBpVL4S8JtUjo0deSqp48VvP4jnjG8en1sWDkXthjubMvxMlszVMkwiBxtQWyrhrd3ovrIBVklZMcmKBF8goYQo2rmZfXNqOQtWhAw8dFaSoQ10pyNzCHAG2I2CMmeG6')
            .send({"hvac_mode": "off", "target_temperature_f": 73})
            .set('Accept', 'application/json')
            .end(function(err, res){
            });
        }
        twilio("Have a great trip to " + flight.end_location + "! We'll take care of your home's energy while you're gone.");
      });
    });
  } else if (startEnd === 'end') {
    // Turn on temperature
    request
      .put('https://developer-api.nest.com/devices/thermostats/z3WfD_k2XQFwte0Yz9jf7ow3-aqdy0De?auth=c.62NNoDDdtN2goM9hiBpVL4S8JtUjo0deSqp48VvP4jnjG8en1sWDkXthjubMvxMlszVMkwiBxtQWyrhrd3ovrIBVklZMcmKBF8goYQo2rmZfXNqOQtWhAw8dFaSoQ10pyNzCHAG2I2CMmeG6')
      .send({"hvac_mode": "cool", "target_temperature_f": 73})
      .set('Accept', 'application/json')
      .end(function(err, res){
      });
    var numDaysGone = (flight.end_time - flight.start_time) / 1000 / 60 / 60 / 24;

    //assume equipment size is 3 tons per household
    var equipmentSize = 3;
    //average electric rate for the US
    var averageElectricRate = 17.5;
    //hours per day unit is on
    var hoursPerDay = 10;
    //SEER efficiency rating
    var seer = 10;
    var saved = Math.round((numDaysGone*averageElectricRate*hoursPerDay) / equipmentSize / seer * 100)/100;
    require('../app').lastSavedMoney = saved;
    twilio("Welcome home! While you were gone, we saved $" + saved + " from your energy bill by turning off your heating and cooling systems. Go treat yourself!");
  }
};

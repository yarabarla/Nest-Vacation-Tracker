var asid = 'AC0a4392bb259617b9b81deaa0ea1990ba';
var authToken = '11420b5314093cde03b91f3cf713e63d';
var fromPhoneNumber = '+14708656252';

var client = require('twilio')('AC0a4392bb259617b9b81deaa0ea1990ba', '11420b5314093cde03b91f3cf713e63d');
module.exports = function(body) {
  client.sendMessage({
    to:'+' + process.env.phone, // Any number Twilio can deliver to
    from: fromPhoneNumber, // A number you bought from Twilio and can use for outbound communication
    body: body // body of the SMS message
  }, function(err, responseData) { //this function is executed when a response is received from Twilio

  });
};
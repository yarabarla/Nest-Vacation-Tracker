var request = require('request');

module.exports = {
  getTemperature: function (zip, cb) {
    var url = 'http://api.openweathermap.org/data/2.5/weather?zip='+zip+',us';
    request(url, function (error, response, body) {
      var main = JSON.parse(body).main;
      var avgTempK = (main.temp_min + main.temp_max)/2;
      var avgTempF = (avgTempK - 273.15) * 9 / 5 + 32;
      cb(error, avgTempF);
    })
  }
};

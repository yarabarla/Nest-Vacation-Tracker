var express = require('express');
var router = express.Router();
var weather = require('../helper/weather');

/* GET home page. */
router.get('/', function(req, res, next) {
  require('../helper/nest').getZip(function(err, data) {
    var structures = JSON.parse(data).structures;
    var postalCode = structures[Object.keys(structures)[0]].postal_code;
    weather.getTemperature(postalCode, function(err, data) {
      console.log(data);
    });
  });
  res.send({test:'hi'});
});

module.exports = router;

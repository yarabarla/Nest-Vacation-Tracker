var express = require('express');
var router = express.Router();
var updateTrip = require('../helper/updateTrip');

/* GET last saved money. */
router.get('/', function(req, res, next) {
  res.render('index');
});

var trip = null;
router.post('/start', function(req, res, next) {
  var days = req.body.days || 40;
  var dest = req.body.dest || "NYC";
  var end_time = new Date(+new Date + days * (1000 * 60 * 60 * 24));
  trip = {
    "start_time": new Date(),
    "end_time": end_time,
    "start_location": "MTV",
    "end_location": dest
  };
  updateTrip(trip, 'start');
});
router.post('/stop', function() {
  updateTrip(trip, 'end');
});

router.get('/api', function(req, res, next) {
  var lastSavedMoney = require('../app').lastSavedMoney || 90.43;
  res.send({"lastSavedMoney":lastSavedMoney});
});

module.exports = router;

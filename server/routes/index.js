var express = require('express');
var router = express.Router();

/* GET last saved money. */
router.get('/', function(req, res, next) {
  require('./app').lastSavedMoney
  res.send({"lastSavedMoney":lastSavedMoney});
});

module.exports = router;

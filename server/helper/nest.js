var request = require('request');
var ALL_URL = 'https://developer-api.nest.com/?auth=c.62NNoDDdtN2goM9hiBpVL4S8JtUjo0deSqp48VvP4jnjG8en1sWDkXthjubMvxMlszVMkwiBxtQWyrhrd3ovrIBVklZMcmKBF8goYQo2rmZfXNqOQtWhAw8dFaSoQ10pyNzCHAG2I2CMmeG6';

module.exports = {
  getZip: function(cb) {
    request(ALL_URL, function (error, response, body) {
      var structures = JSON.parse(body).structures;
      var postalCode = structures[Object.keys(structures)[0]].postal_code;
      cb(error, postalCode);
    })
  }
};

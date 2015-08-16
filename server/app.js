var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// Run every so often
var CRON_FREQUENCY = 5000;
setInterval(function() {
  fs = require('fs')
  fs.readFile('./data/flights.json', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    var flights = JSON.parse(data).flights;

    // Check if the flight is now
    for (var i in flights) {
      var flight = flights[i];
      var now = +new Date();
      if (flight.start_time > now && flight.start_time <= now + CRON_FREQUENCY) {
        // Flight is now, go message about it.
        request('http://localhost:3000');
      } else if (flights.end_time - CRON_FREQUENCY >  now && flights.end_time < now) {
        // Flight came back now, go message about it.
        request('http://localhost:3000');
      }
    }
  });
}, CRON_FREQUENCY);

module.exports = app;

// ==UserScript==
// @name         Nest Thermostat Vacation Saver UI
// @version      1.0
// @include      https://home.nest.com/*
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==

$(document).ready(function() {
    //assume equipment size is 3 tons per household
    var equipmentSize = 3;
    //average electric rate for the US
    var averageElectricRate = 17.5;
    //hours per day unit is on
    var hoursPerDay = 5;
    //SEER efficiency rating
    var seer = 10;
    var days = 31;
    var cost = Math.round((days*averageElectricRate*hoursPerDay) / equipmentSize / seer * 100)/100;

    var html = '<div class="price-saver" style="color:white">' +
        '<h2 class="mode-title">' +
        'You have saved $' + cost + ' from turning off your HVAC during your vacation! ' +
        'Now go treat yourself!' +
        '</h2> </div>';

    var interval = setInterval(function () {
        if ($(".add-device-deck-item").length) {
            clearInterval(interval);
            $(html).insertBefore("li.add-device-deck-item");
        }
    });
});

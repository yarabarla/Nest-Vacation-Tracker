// ==UserScript==
// @name         Nest Thermostat Vacation Saver UI
// @version      1.0
// @include      https://home.nest.com/*
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==

$(document).ready(function() {
    console.log('getting');
    $.get('http://localhost:3000/api', function(data) {
        console.log('got');
        var html = '<div class="price-saver" style="color:white">' +
            '<h2 class="mode-title">' +
            'You have saved $<strong>' + data + '</strong> from turning off your HVAC during your vacation! ' +
            'Now go treat yourself!' +
            '</h2> </div>';

        var interval = setInterval(function () {
            if ($(".add-device-deck-item").length) {
                clearInterval(interval);
                $(html).insertBefore("li.add-device-deck-item");
            }
        });
    });
});
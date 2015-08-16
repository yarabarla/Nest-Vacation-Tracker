// ==UserScript==
// @name  Nest Thermostat Vacation Saver UI
// @version 1.0
// @include https://home.nest.com/*
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

$(document).ready(function() {
    console.log("Hit");
    var html = '<div class="price-saver">' +
      '<h2 class="mode-title">' + 
      'You have saved $ extra from your vacation!' +
      '</h2> </div>';

    var interval = setInterval(function () {
        if ($(".add-device-deck-item").length) {
            clearInterval(interval);
            $(html).insertBefore(".add-device-deck-item");
        }
    });
});

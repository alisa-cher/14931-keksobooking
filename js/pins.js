'use strict';

var pinsList = document.querySelector('.map__pins');
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var PINS_QUANTITY = 70;

(function () {

  window.generatePins = function (array) {
    array.length = array.length > PINS_QUANTITY ? PINS_QUANTITY : array.length;

    for (var i = 0; i < 5; i++) {
      var template = document.querySelector('template').content;
      var sample = template.cloneNode(true);
      var pin = sample.querySelector('.map__pin');
      var icon = sample.querySelector('.map__pin-icon');

      pin.style.left = (array[i].location.x + PIN_WIDTH / 2) + 'px';
      pin.style.top = (array[i].location.y - PIN_HEIGHT) + 'px';
      icon.src = array[i].author.avatar;

      pinsList.appendChild(pin);
    }
  };
})();
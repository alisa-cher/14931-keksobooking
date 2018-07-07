'use strict';

(function () {

  var PINS_QUANTITY = 5;
  var MAP_LEFT_X = 0;
  var Y_MIN_VALUE = 130;
  var Y_MAX_VALUE = 630;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var PIN_MAIN_WIDTH = 66;
  var PIN_MAIN_HEIGHT = 74;
  var pinY = window.elements.pinMain.offsetTop;
  var pinX = window.elements.pinMain.offsetLeft;


  var PIN_MAIN_INITIAL_COORDS = {
    X: 570,
    Y: 375
  };

  window.pins = {
    PIN_MAIN_INITIAL_COORDS: PIN_MAIN_INITIAL_COORDS,
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT,
    PIN_MAIN_WIDTH: PIN_MAIN_WIDTH,
    PIN_MAIN_HEIGHT: PIN_MAIN_HEIGHT,
    pinY: pinY,
    pinX: pinX,

    generate: function (array) {
      array.length = array.length > PINS_QUANTITY ? PINS_QUANTITY : array.length;

      for (var i = 0; i < array.length; i++) {
        var template = document.querySelector('template').content;
        var sample = template.cloneNode(true);
        var pin = sample.querySelector('.map__pin');
        var icon = sample.querySelector('.map__pin-icon');

        pin.style.left = (array[i].location.x + window.pins.PIN_WIDTH / 2) + 'px';
        pin.style.top = (array[i].location.y - window.pins.PIN_HEIGHT) + 'px';
        icon.src = array[i].author.avatar;

        window.elements.pinsList.appendChild(pin);
      }
    },
    clear: function () {
      var pinsSecondary = document.querySelectorAll('.map__pin:not(.map__pin--main)');

      if (pinsSecondary) {
        for (var i = 0; i < pinsSecondary.length; ++i) {
          pinsSecondary[i].remove();
        }
      }
    },
    resetInitialMainPinState: function () {
      window.elements.pinMain.style.top = window.pins.PIN_MAIN_INITIAL_COORDS.Y + 'px';
      window.elements.pinMain.style.left = window.pins.PIN_MAIN_INITIAL_COORDS.X + 'px';
    }
  };

  var pinMainEnterButtonPressHandler = function (evt) {
    evt.preventDefault();

    if ((evt.keyCode === window.keycodes.ENTER) && (!window.map.activeMode)) {
      window.map.enableActiveMode();
    }
  };
  var pinMainMouseDownHandler = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var pinMainMouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var PIN_FINAL_Y = window.elements.pinMain.offsetTop - shift.y;
      var PIN_FINAL_X = window.elements.pinMain.offsetLeft - shift.x;

      if (PIN_FINAL_Y >= Y_MAX_VALUE) {
        window.elements.pinMain.style.top = Y_MAX_VALUE + 'px';
      } else if (PIN_FINAL_Y <= Y_MIN_VALUE) {
        window.elements.pinMain.style.top = Y_MIN_VALUE + 'px';
      } else {
        window.elements.pinMain.style.top = (window.elements.pinMain.offsetTop - shift.y) + 'px';
      }

      var box = window.elements.map.getBoundingClientRect();

      if (PIN_FINAL_X <= MAP_LEFT_X) {
        window.elements.pinMain.style.left = MAP_LEFT_X;
      } else if (PIN_FINAL_X >= (box.width - PIN_MAIN_WIDTH)) {
        window.elements.pinMain.style.left = (box.width - PIN_MAIN_WIDTH) + 'px';
      } else {
        window.elements.pinMain.style.left = PIN_FINAL_X + 'px';
      }

      window.elements.addressField.value = ((window.elements.pinMain.offsetLeft - shift.x) + PIN_MAIN_WIDTH / 2) + ' , ' + ((window.elements.pinMain.offsetTop - shift.y) - PIN_MAIN_HEIGHT);

      if (!window.map.activeMode) {
        window.map.enableActiveMode();
      }
    };

    var pinMainMouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      window.elements.addressField.value = (window.elements.pinMain.offsetLeft + PIN_MAIN_WIDTH / 2) + ' , ' + (window.elements.pinMain.offsetTop + PIN_MAIN_HEIGHT);

      document.removeEventListener('mousemove', pinMainMouseMoveHandler);
      document.removeEventListener('mouseup', pinMainMouseUpHandler);
    };

    document.addEventListener('mousemove', pinMainMouseMoveHandler);
    document.addEventListener('mouseup', pinMainMouseUpHandler);
  };
  window.elements.pinMain.addEventListener('mousedown', pinMainMouseDownHandler);
  window.elements.pinMain.addEventListener('keydown', pinMainEnterButtonPressHandler);

})();

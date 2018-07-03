'use strict';

(function () {

  window.keycodes = {
    ESC: 27,
    ENTER: 13
  };

  window.elements = {
    map: document.querySelector('.map'),
    form: document.querySelector('.ad-form'),
    addressField: document.querySelector('#address'),
    filter: document.querySelector('.map__filters'),
    pinMain: document.querySelector('.map__pin--main'),
    pinsList: document.querySelector('.map__pins')
  };

  window.debounce = function (fun, time) {
    var counter;

    return function () {
      var context = this;
      var args = arguments;

      if (counter) {
        window.clearTimeout(counter);
      }

      counter = window.setTimeout(function () {
        counter = null;
        fun.apply(context, args);
      }, time);
    };
  };
})();

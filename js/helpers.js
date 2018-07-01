'use strict';

(function () {

  window.keycodes = {
    ESC: 27,
    ENTER: 13
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

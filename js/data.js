'use strict';

(function () {

  window.data = {
    saved: null,
    get: function () {
      window.backend.load((function (response) {
        window.data.saved = response.slice();
      }), window.backend.errorHandler);
    }
  };
}());

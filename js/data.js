'use strict';

var savedData;

(function () {

  window.data = {
    get: function() {
      window.backend.load((function(response) {
        savedData = response.slice();
      }), window.backend.errorHandler);
    }
  };
}());

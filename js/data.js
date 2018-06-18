'use strict';

var savedData;

(function () {

  window.data = {
    getData: function() {
      window.backend.load((function(response) {
        savedData = response.slice();
      }));
    }
  };
}());

window.addEventListener("load", window.data.getData);

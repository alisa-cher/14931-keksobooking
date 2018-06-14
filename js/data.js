'use strict';

var savedData;

(function () {

  window.data = {
    getData: function() {
      console.log("All resources finished loading!");
      window.backend.load((function(response) {
        savedData = response.slice();
        console.log(savedData);
      }));
    }
  };
}());

window.addEventListener("load", window.data.getData);

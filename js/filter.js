'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var offerFeatures = document.querySelectorAll('#housing-features input');

  var filterArray = function (array) {
    return array
        .filter(function (item) {
          var thisRooms = item.offer.rooms;
          var offerRooms = document.querySelector('#housing-rooms').value;

          return (offerRooms !== 'any') ? thisRooms === parseInt(offerRooms, 10) : true;
        })
        .filter(function (item) {
          var thisType = item.offer.type;
          var offerType = document.querySelector('#housing-type').value;

          return (offerType !== 'any') ? thisType === offerType : true;
        })
        .filter(function (item) {
          var thisGuests = item.offer.guests;
          var offerCapacity = document.querySelector('#housing-guests').value;

          return (offerCapacity !== 'any') ? thisGuests === parseInt(offerCapacity, 10) : true;
        })
        .filter(function (item) {
          var thisPrice = item.offer.price;
          var offerPrice = document.querySelector('#housing-price').value;

          switch (offerPrice) {
            case 'low':
              return thisPrice <= 10000;
            case 'middle':
              return (thisPrice >= 10000 && thisPrice <= 50000);
            case 'high':
              return thisPrice >= 50000;
            default:
              return thisPrice;
          }
        })
        .filter(function (item) {
          var thisFeatures = item.offer.features;
          var checkedCheckboxes = [];

          for (var i = 0; i < offerFeatures.length; i++) {
            if (offerFeatures[i].checked) {
              checkedCheckboxes.push(offerFeatures[i].value);
            }
          }
          return checkedCheckboxes.every(function (instance) {
            return (thisFeatures.indexOf(instance) !== -1);
          });
        });
  };

  var onInputClickHandler = window.debounce(function () {
    window.pins.clear();
    window.offers.clear();

    var finalData = filterArray(window.data.saved);
    window.pins.generate(finalData);
    window.offers.render(finalData);

  }, DEBOUNCE_INTERVAL);

  window.elements.filter.addEventListener('change', onInputClickHandler);
}());

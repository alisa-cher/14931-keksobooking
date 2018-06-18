'use strict';

var offerFeatures = document.querySelectorAll('#housing-features input');
var formElement = document.querySelector('.map__filters');

function getValues(array) {
  return array
    .filter(function (item) {
      var thisRooms = item.offer.rooms;
      var offerRooms = document.querySelector('#housing-rooms').value;

      return (offerRooms !== "any") ? thisRooms === parseInt(offerRooms) : true;
    })
    .filter(function (item) {
      var thisType = item.offer.type;
      var offerType = document.querySelector('#housing-type').value;

      return (offerType !== "any") ? thisType === offerType : true;
    })
    .filter(function (item) {
      var thisGuests = item.offer.guests;
      var offerCapacity = document.querySelector('#housing-guests').value;

      return (offerCapacity !== "any") ? thisGuests === parseInt(offerCapacity) : true;
    })
    .filter(function (item) {
      var thisPrice = item.offer.price;
      var offerPrice = document.querySelector('#housing-price').value;

      switch (offerPrice) {
        case "low":
          return thisPrice <= 10000;
        case "middle":
          return (thisPrice >= 10000 && thisPrice <= 50000);
          break;
        case "high":
          return thisPrice >= 50000;
          break;
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
        return(thisFeatures.indexOf(instance) !== -1);
      })
    });
}

formElement.addEventListener('change', function () {
  console.dir(getValues(savedData));
});

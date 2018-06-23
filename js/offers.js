'use strict';

(function () {
  var map = document.querySelector('.map');

  window.generateOffer = function (offers, obj) {
    var template = document.querySelector('template').content;
    var element = template.cloneNode(true);
    var mapCard = element.querySelector('.map__card');

    var getAppartementType = function () {
      switch (offers[obj].offer.type) {
        case 'flat':
          return 'Квартира';
        case 'bungalo':
          return 'Бунгало';
        default:
          return 'Дом';
      }
    };

    mapCard.querySelector('h3').textContent = offers[obj].offer.title;
    mapCard.querySelector('.popup__text--address').textContent = offers[obj].offer.address;
    mapCard.querySelector('.popup__text--price').textContent = offers[obj].offer.price + '\t\u20BD/ночь';
    mapCard.querySelector('h4').textContent = getAppartementType();
    mapCard.querySelector('.popup__text--capacity').textContent = offers[obj].offer.rooms + ' комнаты для ' + offers[obj].offer.guests + ' гостей';
    mapCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + offers[obj].offer.checkin + ' , выезд до ' + offers[obj].offer.checkout;
    mapCard.querySelector('.popup__avatar').src = offers[obj].author.avatar;
    mapCard.querySelector('.popup__description').textContent = offers[obj].offer.description;

    var photosArray = offers[obj].offer.photos;
    var featuresArray = offers[obj].offer.features;

    for (var i = 0; i < featuresArray.length; i++) {
      var featuresWrapper = element.querySelector('.popup__features');
      var featuresItem = document.createElement('li');
      featuresItem.classList = 'popup__feature popup__feature--' + featuresArray[i];
      featuresWrapper.appendChild(featuresItem);
    }

    for (i = 0; i < photosArray.length; i++) {
      var picturesWrapper = element.querySelector('.popup__photos');
      var photosItem = document.createElement('img');
      photosItem.src = photosArray[i];
      photosItem.style.width = '45px';
      photosItem.style.height = '40px';
      photosItem.classList = 'popup__photo';
      photosItem.alt = 'Фотография жилья';
      picturesWrapper.appendChild(photosItem);
    }

    map.appendChild(mapCard);
  };

  var renderOffer = function () {
    console.log(savedData[2]);
    generateOffer(savedData, 2);
  };

  setTimeout(renderOffer, 5000);
  console.log(savedData);
})();
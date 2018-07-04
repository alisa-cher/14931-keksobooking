'use strict';

(function () {

  var PICTURE_WIDTH = 45;
  var PICTURE_HEIGHT = 40;

  window.offers = {
    clear: function () {
      var offerExists = document.querySelector('.map__card');
      if (offerExists) {
        offerExists.remove();
      }
    },
    getTemplate: function (offers, obj) {

      var template = document.querySelector('template').content;
      var element = template.cloneNode(true);
      var offerElement = element.querySelector('.map__card');

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

      offerElement.querySelector('h3').textContent = offers[obj].offer.title;
      offerElement.querySelector('.popup__text--address').textContent = offers[obj].offer.address;
      offerElement.querySelector('.popup__text--price').textContent = offers[obj].offer.price + '\t\u20BD/ночь';
      offerElement.querySelector('h4').textContent = getAppartementType();
      offerElement.querySelector('.popup__text--capacity').textContent = offers[obj].offer.rooms + ' комнаты для ' + offers[obj].offer.guests + ' гостей';
      offerElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offers[obj].offer.checkin + ' , выезд до ' + offers[obj].offer.checkout;
      offerElement.querySelector('.popup__avatar').src = offers[obj].author.avatar;
      offerElement.querySelector('.popup__description').textContent = offers[obj].offer.description;

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
        photosItem.style.width = PICTURE_WIDTH + 'px';
        photosItem.style.height = PICTURE_HEIGHT + 'px';
        photosItem.classList = 'popup__photo';
        photosItem.alt = 'Фотография жилья';
        picturesWrapper.appendChild(photosItem);
      }


      window.elements.map.appendChild(offerElement);
    },
    render: function (offers) {
      var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

      var buttonClickHandler = function (evt) {
        var lastActivePin = document.querySelector('.map__pin--active');
        var pin = evt.currentTarget;

        if (lastActivePin) {
          lastActivePin.classList.remove('map__pin--active');
        }

        pin.classList.add('map__pin--active');

        var pinImg = pin.querySelector('img');
        var pinSrc = pinImg.getAttribute('src');

        for (var i = 0; i < offers.length; i++) {
          var obj = i;
          var avatar = offers[obj].author.avatar;
          if (avatar === pinSrc) {
            window.offers.clear();
            window.offers.getTemplate(offers, obj);
            popupHandler();
          }
        }
      };

      for (var i = 0; i < pins.length; i++) {
        pins[i].addEventListener('click', buttonClickHandler);
      }
    }
  };

  var popupHandler = function () {
    var popupCloseButton = document.querySelector('.popup__close');

    var onPopupEscPress = function (evt) {
      if (evt.keyCode === window.keycodes.ESC) {
        window.offers.clear();
      }
    };

    document.addEventListener('keydown', onPopupEscPress);
    popupCloseButton.addEventListener('click', window.offers.clear);
  };
})();

'use strict';

var inputAdress = document.querySelector('#address');
var inputFields = document.querySelectorAll('.ad-form fieldset');
var priceField = document.querySelector('#price');

(function () {
  var checkinField = document.querySelector('#timein');
  var checkoutField = document.querySelector('#timeout');
  var roomsField = document.querySelector('#room_number');
  var guestsField = document.querySelector('#capacity');
  var propertyTypeField = document.querySelector('#type');
  var successElement = document.querySelector('.success');

  window.form = {
    reset: function () {
      formElement.reset();
      priceField.min = '1000';
      priceField.placeholder = '1000';
      guestsField[0].setAttribute('disabled', '');
      guestsField[1].setAttribute('disabled', '');
      guestsField[2].removeAttribute('disabled', '');
      guestsField.selectedIndex = '2';
      guestsField[3].setAttribute('disabled', '');
      inputAdress.setAttribute('value', PIN_INITIAL_POSITIONING);
      pinMain.style.top = PIN_INITIAL_Y + 'px';
      pinMain.style.left = PIN_INITIAL_X + 'px';
      for (var i = 0; i < inputFields.length; i++) {
        inputFields[i].setAttribute('disabled', '');
      }
    }
  };

  var checkboxPressEnterHandler = function (evt) {
    if (evt.keyCode === window.keycode.ENTER && evt.target.type === 'checkbox') {
      evt.target.checked = !evt.target.checked;
    }
  };

  var setMinFieldValue = function () {
    switch (propertyTypeField.value) {
      case 'bungalo':
        priceField.min = '0';
        priceField.placeholder = '0';
        break;
      case 'flat':
        priceField.min = '1000';
        priceField.placeholder = '1000';
        break;
      case 'house':
        priceField.min = '5000';
        priceField.placeholder = '5000';
        break;
      default:
        priceField.min = '10000';
        priceField.placeholder = '10000';
    }
  };

  var syncValue = function (evt) {
    var target = evt.currentTarget;
    if (target === checkoutField) {
      checkinField.value = checkoutField.value;
    } else {
      checkoutField.value = checkinField.value;
    }
  };

  var syncGuests = function () {
    switch (roomsField.selectedIndex) {
      case 0:
        guestsField[0].setAttribute('disabled', '');
        guestsField[1].setAttribute('disabled', '');
        guestsField[2].removeAttribute('disabled', '');
        guestsField.selectedIndex = '2';
        guestsField[3].setAttribute('disabled', '');
        break;
      case 1:
        guestsField[0].setAttribute('disabled', '');
        guestsField[1].removeAttribute('disabled', '');
        guestsField[2].removeAttribute('disabled', '');
        guestsField.selectedIndex = '2';
        guestsField[3].setAttribute('disabled', '');
        break;
      case 2:
        guestsField[0].removeAttribute('disabled', '');
        guestsField.selectedIndex = '0';
        guestsField[1].removeAttribute('disabled', '');
        guestsField[2].removeAttribute('disabled', '');
        guestsField[3].setAttribute('disabled', '');
        break;
      case 3:
        guestsField[0].setAttribute('disabled', '');
        guestsField[1].setAttribute('disabled', '');
        guestsField[2].setAttribute('disabled', '');
        guestsField[3].removeAttribute('disabled', '');
        guestsField.selectedIndex = '3';
        break;
    }
  };

  var successFormLoadHandler = function () {
    window.map.enableDisabledMode();
    showSuccessWindow();
  };

  var submitButtonPressHandler = function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(formElement), successFormLoadHandler, window.backend.errorHandler);
  };

  var showSuccessWindow = function () {
    successElement.classList.remove('hidden');
  };

  var hideSuccessWindow = function (evt) {
    if (evt.keyCode === window.keycodes.ESC || evt.type === 'click') {
      successElement.classList.add('hidden');
    }
  };

  propertyTypeField.addEventListener('change', setMinFieldValue);
  checkinField.addEventListener('change', syncValue);
  checkoutField.addEventListener('change', syncValue);
  roomsField.addEventListener('click', syncGuests);
  roomsField.addEventListener('change', syncGuests);
  document.addEventListener('keydown', hideSuccessWindow);
  successElement.addEventListener('click', hideSuccessWindow);
  document.addEventListener('keydown', checkboxPressEnterHandler);
  formElement.addEventListener('submit', submitButtonPressHandler);
})();
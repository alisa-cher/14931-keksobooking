'use strict';

(function () {
  var inputFields = document.querySelectorAll('.ad-form fieldset');
  var priceField = document.querySelector('#price');
  var checkinField = document.querySelector('#timein');
  var checkoutField = document.querySelector('#timeout');
  var roomsField = document.querySelector('#room_number');
  var guestsField = document.querySelector('#capacity');
  var propertyTypeField = document.querySelector('#type');
  var successElement = document.querySelector('.success');

  window.form = {
    disableFields: function () {
      for (var i = 0; i < inputFields.length; i++) {
        inputFields[i].setAttribute('disabled', '');
      }
    },
    enableFields: function () {
      for (var i = 0; i < inputFields.length; i++) {
        inputFields[i].removeAttribute('disabled');
      }
    },
    resetGuestsValue: function () {
      guestsField[0].setAttribute('disabled', '');
      guestsField[1].setAttribute('disabled', '');
      guestsField[2].removeAttribute('disabled', '');
      guestsField.selectedIndex = '2';
      guestsField[3].setAttribute('disabled', '');
    },
    resetAddressValue: function () {
      window.elements.addressField.setAttribute('value', (window.pins.PIN_MAIN_INITIAL_COORDS.X + window.pins.PIN_MAIN_WIDTH / 2) + ' , ' + (window.pins.PIN_MAIN_INITIAL_COORDS.Y + window.pins.PIN_MAIN_HEIGHT));
    },
    resetPriceValue: function () {
      priceField.min = '1000';
      priceField.placeholder = priceField.min;
    },
    resetAll: function () {
      window.elements.form.reset();
      window.form.resetPriceValue();
      window.form.resetGuestsValue();
      window.form.resetAddressValue();
      window.form.disableFields();
    }
  };

  var checkboxPressEnterHandler = function (evt) {
    if (evt.keyCode === window.keycodes.ENTER && evt.target.type === 'checkbox') {
      evt.target.checked = !evt.target.checked;
    }
  };

  var propertyTypeFieldChangeHandler = function () {
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

  var checkinAndCheckoutFieldsChangeHandler = function (evt) {
    var target = evt.currentTarget;
    if (target === checkoutField) {
      checkinField.value = checkoutField.value;
    } else {
      checkoutField.value = checkinField.value;
    }
  };

  var roomsFieldChangeHandler = function () {
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
    window.backend.upload(new FormData(window.elements.form), successFormLoadHandler, window.backend.errorHandler);
  };

  var showSuccessWindow = function () {
    successElement.classList.remove('hidden');
  };

  var successWindowClickAndPressButtonHandler = function (evt) {
    if (evt.keyCode === window.keycodes.ESC || evt.type === 'click') {
      successElement.classList.add('hidden');
    }
  };

  propertyTypeField.addEventListener('change', propertyTypeFieldChangeHandler);
  checkinField.addEventListener('change', checkinAndCheckoutFieldsChangeHandler);
  checkoutField.addEventListener('change', checkinAndCheckoutFieldsChangeHandler);
  roomsField.addEventListener('click', roomsFieldChangeHandler);
  roomsField.addEventListener('change', roomsFieldChangeHandler);
  document.addEventListener('keydown', successWindowClickAndPressButtonHandler);
  successElement.addEventListener('click', successWindowClickAndPressButtonHandler);
  document.addEventListener('keydown', checkboxPressEnterHandler);
  window.elements.form.addEventListener('submit', submitButtonPressHandler);
})();

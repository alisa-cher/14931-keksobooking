'use strict';

(function () {
  var resetButton = document.querySelector('.ad-form__reset');

  window.map = {
    enableDisabledMode: function () {
      activeMode = null;
      mapElement.classList.add('map--faded');
      formElement.classList.add('ad-form--disabled');
      window.form.reset();
      window.pins.clear();
      window.offers.clear();
    },
    enableActiveMode: function () {
      mapElement.classList.remove('map--faded');
      formElement.classList.remove('ad-form--disabled');
      for (var i = 0; i < inputFields.length; i++) {
        inputFields[i].removeAttribute('disabled');
      }

      inputAdress.value = (pinMain.offsetLeft + PIN_MAIN_WIDTH / 2) + ' , ' + (pinMain.offsetTop - PIN_MAIN_HEIGHT);

      window.data.get();
      if (window.data.saved) {
        activeMode = true;
        filterForm.classList.remove('hidden');
        window.pins.generate(window.data.saved);
        window.offers.render(window.data.saved);
      }
    }
  };

  window.map.enableDisabledMode();
  resetButton.addEventListener('click', window.map.enableDisabledMode);
})();
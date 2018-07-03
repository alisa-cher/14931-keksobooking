'use strict';

(function () {
  window.map = {
    activeMode: null,
    enableDisabledMode: function () {
      window.map.activeMode = null;
      window.elements.map.classList.add('map--faded');
      window.elements.form.classList.add('ad-form--disabled');
      window.form.resetAll();
      window.pins.clear();
      window.pins.resetInitialMainPinState();
      window.offers.clear();
    },
    enableActiveMode: function () {
      window.elements.map.classList.remove('map--faded');
      window.elements.form.classList.remove('ad-form--disabled');
      window.form.resetAddressValue();
      window.form.enableFields();
      window.data.get();

      if (window.data.saved) {
        window.map.activeMode = true;
        window.elements.filter.classList.remove('hidden');
        window.pins.generate(window.data.saved);
        window.offers.render(window.data.saved);
      }
    }
  };

  window.map.enableDisabledMode();
  var resetButton = document.querySelector('.ad-form__reset');
  resetButton.addEventListener('click', window.map.enableDisabledMode);
})();

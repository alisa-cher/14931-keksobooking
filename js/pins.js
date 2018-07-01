'use strict';

var pinsList = document.querySelector('.map__pins');
var pinMain = document.querySelector('.map__pin--main');
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var PINS_QUANTITY = 5;
var pinY = pinMain.offsetTop;
var pinX = pinMain.offsetLeft;
var PIN_MAIN_WIDTH = 66;
var PIN_MAIN_HEIGHT = 74;
var PIN_INITIAL_X = pinX - PIN_WIDTH / 2;
var PIN_INITIAL_Y = pinY + PIN_HEIGHT;
var PIN_INITIAL_POSITIONING = (pinMain.offsetLeft + PIN_WIDTH / 2) + ' , ' + (pinMain.offsetTop - PIN_HEIGHT);
var Y_MIN_VALUE = 130;
var Y_MAX_VALUE = 625;
var MAP_LEFT_X = 0;
var formElement = document.querySelector('.ad-form');
var mapElement = document.querySelector('.map');
var activeMode;

(function () {
	var pinMainEnterButtonPress = function (evt) {
		evt.preventDefault();

		if ((evt.keyCode === ENTER_CODE) && (!activeMode)) {
			window.map.enableActiveMode();
		}
	};
	var pinMainHandle = function (evt) {
		evt.preventDefault();

		var startCoords = {
			x: evt.clientX,
			y: evt.clientY
		};

		var onMouseMove = function (moveEvt) {
			moveEvt.preventDefault();

			var shift = {
				x: startCoords.x - moveEvt.clientX,
				y: startCoords.y - moveEvt.clientY
			};

			startCoords = {
				x: moveEvt.clientX,
				y: moveEvt.clientY
			};

			var PIN_FINAL_Y = pinMain.offsetTop - shift.y;
			var PIN_FINAL_X = pinMain.offsetLeft - shift.x;

			if (PIN_FINAL_Y >= Y_MAX_VALUE) {
				pinMain.style.top = Y_MAX_VALUE + 'px';
			} else if (PIN_FINAL_Y <= Y_MIN_VALUE) {
				pinMain.style.top = Y_MIN_VALUE + 'px';
			} else {
				pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
			}

			// left positioning of the dragged pin
			var box = mapElement.getBoundingClientRect();

			if (PIN_FINAL_X <= MAP_LEFT_X) {
				pinMain.style.left = MAP_LEFT_X;
			} else if (PIN_FINAL_X >= (box.width - PIN_WIDTH)) {
				pinMain.style.left = (box.width - PIN_WIDTH) + 'px';
			} else {
				pinMain.style.left = PIN_FINAL_X + 'px';
			}

			inputAdress.value = ((pinMain.offsetLeft - shift.x) + PIN_WIDTH / 2) + ' , ' + ((pinMain.offsetTop - shift.y) - PIN_HEIGHT);

			if (!activeMode) {
				window.map.enableActiveMode();
			}
		};

		var onMouseUp = function (upEvt) {
			upEvt.preventDefault();

			document.removeEventListener('mousemove', onMouseMove);
			document.removeEventListener('mouseup', onMouseUp);
		};

		document.addEventListener('mousemove', onMouseMove);
		document.addEventListener('mouseup', onMouseUp);
	};
	pinMain.addEventListener('mousedown', pinMainHandle);
	pinMain.addEventListener('keydown', pinMainEnterButtonPress);

	window.pins = {
		generate: function (array) {
			array.length = array.length > PINS_QUANTITY ? PINS_QUANTITY : array.length;

			for (var i = 0; i < array.length; i++) {
				var template = document.querySelector('template').content;
				var sample = template.cloneNode(true);
				var pin = sample.querySelector('.map__pin');
				var icon = sample.querySelector('.map__pin-icon');

				pin.style.left = (array[i].location.x + PIN_WIDTH / 2) + 'px';
				pin.style.top = (array[i].location.y - PIN_HEIGHT) + 'px';
				icon.src = array[i].author.avatar;

				pinsList.appendChild(pin);
			}
		},
		clear: function () {
			var pinsSecondary = document.querySelectorAll('.map__pin:not(.map__pin--main)');

			if (pinsSecondary) {
				for (var i = 0; i < pinsSecondary.length; ++i) {
					pinsSecondary[i].remove();
				}
			}
		}
	};
})();
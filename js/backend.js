'use strict';

(function () {

  var GET_URL = 'https://js.dump.academy/keksobooking/data';
  var POST_URL = 'https://js.dump.academy/keksobooking';

  window.backend = {

    statusHandler: function (xhr, onLoad, onError) {
      xhr.addEventListener('load', function () {

        var error;
        switch (xhr.status) {
          case 200:
            onLoad(xhr.response);
            break;
          case 400:
            error = 'Неверный запрос';
            break;
          case 401:
            error = 'Пользователь не авторизован';
            break;
          case 404:
            error = 'Запрашиваемый ресурс не найден';
            break;

          default:
            error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
        }

        if (error) {
          onError(error);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = 1000000;
    },
    errorHandler: function (errorMessage) {
      var node = document.createElement('div');
      node.classList.add('error-popup');
      node.style = 'z-index: 100; ' +
        'margin: 0 auto; ' +
        'padding: 15px 0; ' +
        'text-align: center; ' +
        'background-color: #a8e4ee; ' +
        'cursor: pointer; ' +
        'position: fixed; ' +
        'left: 0; ' +
        'right: 0; ' +
        'bottom: 0;' +
        'font-size: 18px';
      var nodeExists = document.querySelector('.error-popup');

      if (!nodeExists) {
        node.textContent = errorMessage;
        document.body.insertAdjacentElement('afterbegin', node);
      }

      node.addEventListener('click', function () {
        node.remove();
      });
    },
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      window.backend.statusHandler(xhr, onLoad, onError);

      xhr.open('GET', GET_URL);
      xhr.send();
    },
    upload: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      window.backend.statusHandler(xhr, onLoad, onError);

      xhr.open('POST', POST_URL);
      xhr.send(data);
    }
  };
}());

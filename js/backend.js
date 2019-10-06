'use strict';

(function () {
  var STATUS_OK = 200;

  var checkStatus = function (xhr, onLoad, onError) {
    if (xhr.status === STATUS_OK) {
      onLoad(xhr.response);
    } else {
      onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
    }
  };

  var load = function (url, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      checkStatus(xhr, onLoad, onError);
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;

    xhr.open('GET', url);
    xhr.send();
  };

  var save = function (url, data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      checkStatus(xhr, onLoad, onError);
    });

    xhr.open('POST', url);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save,
  };
})();

'use strict';

window.util = (function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  return {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    getRandomInteger: function (min, max) {
      var rand = min + Math.random() * (max + 1 - min);
      return Math.floor(rand);
    },
    showElement: function (selector) {
      var element = document.querySelector(selector);
      element.classList.remove('hidden');
    },
    hideElement: function (selector) {
      var element = document.querySelector(selector);
      element.classList.add('hidden');
    },
  };
})();

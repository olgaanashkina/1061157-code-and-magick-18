'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/code-and-magick/data';
  var URL_SAVE = 'https://js.dump.academy/code-and-magick';

  var coatColor;
  var eyesColor;
  var wizards = [];

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    window.render(wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  window.wizard.onCoatChange = window.debounce(function (color) {
    coatColor = color;
    updateWizards();
  });

  window.wizard.onEyesChange = window.debounce(function (color) {
    eyesColor = color;
    updateWizards();
  });

  var loadHandler = function (data) {
    wizards = data;
    updateWizards();
  };

  var errorHandler = function (errorMessage) {
    var notice = document.createElement('div');
    notice.style = 'z-index: 10; margin: 0 auto; margin-top: 30px; color: red; text-align: center; background-color: white;';
    notice.style.position = 'absolute';
    notice.style.left = 0;
    notice.style.right = 0;
    notice.style.fontSize = '40px';

    notice.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', notice);
  };

  window.backend.load(URL_LOAD, loadHandler, errorHandler);

  var form = window.setup.querySelector('.setup-wizard-form');
  form.addEventListener('submit', function (evt) {
    window.backend.save(URL_SAVE, new FormData(form), function () {
      window.util.hideElement('.setup-wizard-form');
    });
    evt.preventDefault();
  });
})();

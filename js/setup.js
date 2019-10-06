'use strict';

(function () {
  var MAX_WIZARD_COUNT = 4;
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var URL_LOAD = 'https://js.dump.academy/code-and-magick/data';
  var URL_SAVE = 'https://js.dump.academy/code-and-magick';

  window.setup = document.querySelector('.setup');

  var similarListElement = window.setup.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');

  var createWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var loadHandler = function (wizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < MAX_WIZARD_COUNT; i++) {
      fragment.appendChild(createWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);
    window.util.showElement('.setup-similar');
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

  var getFeature = function (arr) {
    var featureRandom = arr[window.util.getRandomInteger(0, arr.length - 1)];
    return featureRandom;
  };

  var userWizardCoat = window.setup.querySelector('.wizard-coat');
  var userWizardEyes = window.setup.querySelector('.wizard-eyes');
  var userFireballColor = window.setup.querySelector('.setup-fireball-wrap');
  var userInputWizardCoat = window.setup.querySelector('[name="coat-color"]');
  var userInputWizardEyes = window.setup.querySelector('[name="eyes-color"]');
  var userInputFireball = window.setup.querySelector('[name="fireball-color"]');

  var onUserWizardClick = function (property, inputProperty, arrColor) {
    var color = getFeature(arrColor);
    property.style = 'fill: ' + color;
    inputProperty.value = color;
  };

  userWizardCoat.addEventListener('click', function () {
    onUserWizardClick(userWizardCoat, userInputWizardCoat, COAT_COLORS);
  });

  userWizardEyes.addEventListener('click', function () {
    onUserWizardClick(userWizardEyes, userInputWizardEyes, EYES_COLORS);
  });

  var onUserFireballClick = function (property, inputProperty, arrColor) {
    var color = getFeature(arrColor);
    property.style = 'background: ' + color;
    inputProperty.value = color;
  };

  userFireballColor.addEventListener('click', function () {
    onUserFireballClick(userFireballColor, userInputFireball, FIREBALL_COLORS);
  });

  var form = window.setup.querySelector('.setup-wizard-form');
  form.addEventListener('submit', function (evt) {
    window.backend.save(URL_SAVE, new FormData(form), function () {
      window.util.hideElement('.setup-wizard-form');
    });
    evt.preventDefault();
  });
})();

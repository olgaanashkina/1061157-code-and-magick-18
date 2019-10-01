'use strict';

(function () {
  var MAX_WIZARD_COUNT = 4;
  var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var FAMILY_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  window.setup = document.querySelector('.setup');

  var showElement = function (selector) {
    var element = document.querySelector(selector);
    element.classList.remove('hidden');
  };

  var getRandomInteger = function (min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  };

  var getFeature = function (arr) {
    var featureRandom = arr[getRandomInteger(0, arr.length - 1)];
    return featureRandom;
  };

  var getName = function () {
    var nameRandom = FIRST_NAMES[getRandomInteger(0, FIRST_NAMES.length - 1)] + ' ' + FAMILY_NAMES[getRandomInteger(0, FAMILY_NAMES.length - 1)];
    return nameRandom;
  };

  var getWizard = function () {
    return {
      name: getName(),
      coatColor: getFeature(EYES_COLORS),
      eyesColor: getFeature(COAT_COLORS)
    };
  };

  var getWizards = function () {
    var wizards = [];

    for (var i = 0; i < MAX_WIZARD_COUNT; i++) {
      wizards.push(getWizard());
    }

    return wizards;
  };

  var similarListElement = window.setup.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');

  var createWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  var renderWizards = function (container, wizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < MAX_WIZARD_COUNT; i++) {
      fragment.appendChild(createWizard(wizards[i]));
    }
    container.appendChild(fragment);
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

  var wizards = getWizards();
  renderWizards(similarListElement, wizards);

  showElement('.setup-similar');
})();

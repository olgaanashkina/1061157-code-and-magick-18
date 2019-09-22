'use strict';

var COUNT = 4;
var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var FAMILY_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var showElement = function (selector) {
  var element = document.querySelector(selector);
  element.classList.remove('hidden');
};

var getRandomInteger = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

var getEyes = function () {
  var eyesRandom = EYES_COLORS[getRandomInteger(0, EYES_COLORS.length - 1)];
  return eyesRandom;
};

var getCoat = function () {
  var coatRandom = COAT_COLORS[getRandomInteger(0,  COAT_COLORS.length - 1)];
  return coatRandom;
};

var getName = function () {
  var nameRandom = FIRST_NAMES[getRandomInteger(0,  FIRST_NAMES.length - 1)] + ' ' + FAMILY_NAMES[getRandomInteger(0,  FAMILY_NAMES.length - 1)];
  return nameRandom;
};

var getWizard = function () {
  return {
    name: getName(),
    coatColor: getCoat(),
    eyesColor: getEyes()
  }
};

var getWizards = function () {
  var wizards = [];

  for (var i = 0; i < COUNT; i++) {
    wizards.push(getWizard());
  }

  return wizards;
};

var userDialog = document.querySelector('.setup');
var similarListElement = userDialog.querySelector('.setup-similar-list');
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
  for (var i = 0; i < COUNT; i++) {
    fragment.appendChild(createWizard(wizards[i]));
  }
  container.appendChild(fragment);
};

var wizards = getWizards();
renderWizards(similarListElement, wizards);

showElement('.setup-similar');
showElement('.setup');

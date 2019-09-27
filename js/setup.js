'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var MAX_WIZARD_COUNT = 4;
var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var FAMILY_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

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
  for (var i = 0; i < MAX_WIZARD_COUNT; i++) {
    fragment.appendChild(createWizard(wizards[i]));
  }
  container.appendChild(fragment);
};

var userNameInput = setup.querySelector('.setup-user-name');

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно быть не менее 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно быть не более 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

var userWizardCoat = setup.querySelector('.wizard-coat');
var userWizardEyes = setup.querySelector('.wizard-eyes');
var userFireballColor = setup.querySelector('.setup-fireball-wrap');
var userInputWizardCoat = setup.querySelector('[name="coat-color"]');
var userInputWizardEyes = setup.querySelector('[name="eyes-color"]');
var userInputFireball = setup.querySelector('[name="fireball-color"]');


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

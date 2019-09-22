'use strict';

var COUNT = 4;
var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var FAMILY_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

// var getWizards = function () {
//   var wizards = [];
//
//   // for (var i = 0; i < COUNT; i++) {
//     wizards.push(player1, player2, player3, player4);
//   // }
//
//   return wizards[i];
// };

var getEyes = function () {
  var eyesRandom = EYES_COLOR[Math.floor(Math.random() * EYES_COLOR.length)];
  return eyesRandom;
};

var getCoat = function () {
  var coatRandom = COAT_COLOR[Math.floor(Math.random() * COAT_COLOR.length)];
  return coatRandom;
};

var getName = function () {
  var nameRandom = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)] + ' ' + FAMILY_NAMES[Math.floor(Math.random() * FAMILY_NAMES.length)];
  return nameRandom;
};

var wizards = [
{
  name: getName(),
  coatColor: getCoat(),
  eyesColor: getEyes()
},
  {
    name: getName(),
    coatColor: getCoat(),
    eyesColor: getEyes()
  },
  {
    name: getName(),
    coatColor: getCoat(),
    eyesColor: getEyes()
  },
  {
    name: getName(),
    coatColor: getCoat(),
    eyesColor: getEyes()
  }
];


var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < COUNT; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');

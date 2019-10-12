'use strict';

window.wizard = (function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green', 'orange', 'lightblue', 'purple'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var wizard = {
    onCoatChange: function () {},
    onEyesChange: function () {},
    onFirebalChange: function () {}
  };

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

  userWizardCoat.addEventListener('click', function () {
    var newColor = getFeature(COAT_COLORS);
    userWizardCoat.style.fill = newColor;
    userInputWizardCoat.value = newColor;
    wizard.onCoatChange(newColor);
  });

  userWizardEyes.addEventListener('click', function () {
    var newColor = getFeature(EYES_COLORS);
    userWizardEyes.style.fill = newColor;
    userInputWizardEyes.value = newColor;
    wizard.onEyesChange(newColor);
  });

  userFireballColor.addEventListener('click', function () {
    var newColor = getFeature(FIREBALL_COLORS);
    userFireballColor.style = 'background: ' + newColor;
    userInputFireball.value = newColor;
    wizard.onFirebalChange(newColor);
  });

  return wizard;
})();

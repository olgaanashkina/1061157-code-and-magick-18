'use strict';

(function () {
  var MAX_WIZARD_COUNT = 4;

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

  window.render = function (data) {
    similarListElement.innerHTML = '';
    for (var i = 0; i < MAX_WIZARD_COUNT; i++) {
      similarListElement.appendChild(createWizard(data[i]));
    }
    window.util.showElement('.setup-similar');
  };
})();

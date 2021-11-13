import {deselectAndHideOption} from './utils/deselect-and-hide-option.js';
import {formCoordinatesInput, onResetButtonClick} from './map.js';

const formRoomNumber = document.querySelector('#room_number');
const formGuestNumber = document.querySelector('#capacity');
const guestNumberOptions = formGuestNumber.querySelectorAll('option');
const notForGuests = formGuestNumber.querySelector('option[value="0"]');
const formAdTitle = document.querySelector('#title');
const formPriceInput = document.querySelector('#price');

const saveFormButton = document.querySelector('.ad-form__submit');
const resetFormButton = document.querySelector('.ad-form__reset');

const onRoomNumberChange = (evt) => {

  formGuestNumber.setCustomValidity('Проверьте количество гостей');
  formGuestNumber.reportValidity();
  formGuestNumber.addEventListener('click', () => {
    formGuestNumber.setCustomValidity('');
  }, {once: true});

  if (+evt.target.value === 100) {
    notForGuests.setAttribute('selected', 'selected');
    for (const guestNumberOption of guestNumberOptions) {
      if (+guestNumberOption.value === 0) {
        notForGuests.classList.remove('hidden');
      } else {
        deselectAndHideOption(guestNumberOption);
      }
    }
    return;
  }

  guestNumberOptions[evt.target.value - 1].setAttribute('selected', 'selected');
  for (const guestNumberOption of guestNumberOptions) {
    if (guestNumberOption.value > evt.target.value) {
      deselectAndHideOption(guestNumberOption);
    } else if (+guestNumberOption.value === 0) {
      deselectAndHideOption(guestNumberOption);
    } else {
      guestNumberOption.classList.remove('hidden');
    }
  }
};

const onSaveFormButtonClick = (element) => {
  element.reportValidity();
};

const onFormAdTitleInput = (element) => {
  if (element.validity.valueMissing) {
    element.setCustomValidity('Это обязательное поле');
  } else if (element.validity.tooLong) {
    element.setCustomValidity(`Удалите ${element.value.length - 100} знаков`);
  } else if (element.validity.tooShort) {
    element.setCustomValidity(`Допишите минимум ${30 - element.value.length} знаков`);
  } else {
    element.setCustomValidity('');
  }
  element.reportValidity();
};

const onFormPriceInput = (element) => {
  if (element.validity.valueMissing) {
    element.setCustomValidity('Это обязательное поле');
  } else if (element.validity.rangeOverFlow) {
    element.setCustomValidity('Максимальная цена: 1 000 000 руб/ночь');
  } else {
    element.setCustomValidity('');
  }
  element.reportValidity();
};

formAdTitle.addEventListener('input', () => {
  onFormAdTitleInput(formAdTitle);
});

formPriceInput.addEventListener('input', () => {
  onFormPriceInput(formPriceInput);
});

formRoomNumber.addEventListener('input', (evt) => {
  onRoomNumberChange(evt);
});

saveFormButton.addEventListener('click', () => {
  onSaveFormButtonClick(saveFormButton);
});

resetFormButton.addEventListener('click', () => {
  onResetButtonClick();
});

export {formRoomNumber, saveFormButton, formAdTitle, formPriceInput, formCoordinatesInput};

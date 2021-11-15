import {deselectAndHideOption} from './utils/deselect-and-hide-option.js';

const formRoomNumber = document.querySelector('#room_number');
const formGuestNumber = document.querySelector('#capacity');
const guestNumberOptions = formGuestNumber.querySelectorAll('option');
const notForGuests = formGuestNumber.querySelector('option[value="0"]');
const saveFormButton = document.querySelector('.ad-form__submit');
const formAdTitle = document.querySelector('#title');
const formPriceInput = document.querySelector('#price');
const formCoordinates = document.querySelector('#address');
const formPlaceType = document.querySelector('#type');
const formTimein = document.querySelector('#timein');
const formTimeout = document.querySelector('#timeout');
const formTimeoutOptions = formTimeout.querySelectorAll('option');

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

const onPlaceTypeInput = (evt) => {
  switch(evt.target.value) {
    case 'bungalow':
      formPriceInput.min = 0;
      break;
    case 'flat':
      formPriceInput.min = 1000;
      break;
    case 'hotel':
      formPriceInput.min = 3000;
      break;
    case 'house':
      formPriceInput.min = 5000;
      break;
    case 'palace':
      formPriceInput.min = 10000;
      break;
  }
  formPriceInput.reportValidity();
};

const onformPriceInput = (element) => {
  if (element.validity.valueMissing) {
    element.setCustomValidity(`Это обязательное поле. Минимальная цена: ${formPriceInput.min} руб/ночь`);
  } else if (element.validity.rangeOverflow) {
    element.setCustomValidity('Максимальная цена: 1 000 000 руб/ночь');
  } else if (element.validity.rangeUnderflow) {
    element.setCustomValidity(`Минимальная цена: ${formPriceInput.min} руб/ночь`);
  } else {
    element.setCustomValidity('');
  }
};

const onTimeinInput = (evt) => {
  for (const formTimeoutOption of formTimeoutOptions) {
    if (formTimeoutOption.value === evt.target.value) {
      formTimeoutOption.setAttribute('selected','selected');
    } else {
      formTimeoutOption.removeAttribute('selected','selected');
    }
  }
};

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

formAdTitle.addEventListener('input', () => {
  onFormAdTitleInput(formAdTitle);
});

formCoordinates.addEventListener('focus', () => {
  formAdTitle.reportValidity();
  onFormAdTitleInput(formAdTitle);
});

formPlaceType.addEventListener('input', (evt) => {
  onPlaceTypeInput(evt);
});

formPriceInput.addEventListener('input', () => {
  onformPriceInput(formPriceInput);
  formPriceInput.reportValidity();
});

formPriceInput.addEventListener('invalid', () => {
  onformPriceInput(formPriceInput);
});

formTimein.addEventListener('input', (evt) => {
  onTimeinInput(evt);
});

formRoomNumber.addEventListener('input', (evt) => {
  onRoomNumberChange(evt);
});

saveFormButton.addEventListener('click', () => {
  onSaveFormButtonClick(saveFormButton);
});

export {formAdTitle, formCoordinates, formPlaceType, formPriceInput, formTimein, formRoomNumber, saveFormButton};

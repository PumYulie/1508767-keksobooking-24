
const formRoomNumber = document.querySelector('#room_number');
const formGuestNumber = document.querySelector('#capacity');
const guestNumberOptions = formGuestNumber.querySelectorAll('option');
const notForGuests = formGuestNumber.querySelector('option[value="0"]');
const saveFormButton = document.querySelector('.ad-form__submit');

const deselectAndHideOption = (option) => {
  option.classList.add('hidden');
  option.removeAttribute('selected', 'selected');
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

// когда удалять этот слушатель событий, чтобы они не копились?
formRoomNumber.addEventListener('input', (evt) => {
  onRoomNumberChange(evt);
});

//когда удалять этот слушатель событий? или поставить чтобы он был одноразовым через once:true?
saveFormButton.addEventListener('click', () => {
  onSaveFormButtonClick(saveFormButton);
});

// не поняла, что отсюда надо экспортировать
export {formRoomNumber, saveFormButton};

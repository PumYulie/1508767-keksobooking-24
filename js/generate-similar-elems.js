const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const namePlaceType = (string) => {
  switch (string) {
    case 'flat': return 'Квартира';
    case 'bungalow': return 'Бунгало';
    case 'house': return 'Дом';
    case 'palace': return 'Дворец';
    case 'hotel': return 'Отель';
  }
};

const insertPlacePhotos = (arrayOfURLs) => {
  const photoContainer = document.createElement('div');

  arrayOfURLs.forEach((url) => {
    const clonedIMG = cardTemplate.querySelector('.popup__photo').cloneNode(true);
    clonedIMG.src = url;
    photoContainer.appendChild(clonedIMG);
  });

  return photoContainer.innerHTML;
};

const insertExistingPlaceFeatures = (arrayOfStrings) => {
  const templateLiItems = cardTemplate.cloneNode(true).querySelectorAll('.popup__feature');
  const receivedClasses = arrayOfStrings.map((string)=> `popup__feature--${string}`);
  const boxOfLi = document.createDocumentFragment();

  templateLiItems.forEach((templateLi) => {
    const workingClass = templateLi.classList[1];
    if (receivedClasses.includes(workingClass)) {
      boxOfLi.append(templateLi);
    }
  });

  return boxOfLi;
};

const removeEmptyElements = (collection) => {
  for (const item of collection) {
    if(typeof item === 'undefined') {
      item.classList.add('hidden');
    }
  }
};

// насколько экологично я использую innerHTML?
const createSimilarPlaceTexts = (author, offer) => {
  const similarPlace = cardTemplate.cloneNode(true);

  removeEmptyElements(similarPlace.children);

  similarPlace.querySelector('.popup__title').textContent = offer.title;
  similarPlace.querySelector('.popup__text--address').textContent = offer.address;
  similarPlace.querySelector('.popup__text--price').innerHTML = `${offer.price} ₽/ночь`;
  similarPlace.querySelector('.popup__type').textContent = namePlaceType(offer.type);
  similarPlace.querySelector('.popup__text--capacity').innerHTML = `${offer.rooms} комнат для ${offer.guests} гостей`;
  similarPlace.querySelector('.popup__text--time').innerHTML = '';
  similarPlace.querySelector('.popup__text--time').insertAdjacentHTML('afterbegin' ,`Заезд после ${offer.checkin}, выезд до ${offer.checkout}`);
  similarPlace.querySelector('.popup__features').innerHTML = '';
  similarPlace.querySelector('.popup__features').append(insertExistingPlaceFeatures(offer.features));
  similarPlace.querySelector('.popup__description').textContent = offer.description;
  similarPlace.querySelector('.popup__photos').innerHTML = insertPlacePhotos(offer.photos);
  similarPlace.querySelector('.popup__avatar').src = author.avatar;

  return similarPlace;
};

export {namePlaceType, insertExistingPlaceFeatures, insertPlacePhotos, createSimilarPlaceTexts};

//прошлая домашка потеряла актуальность
/* const popupArticlesGenerated = arrayOfGeneratedObjects.map( (popupArticle) => {
  const clonedPopupArticle = cardTemplate.cloneNode(true);

  clonedPopupArticle.querySelector('.popup__title').textContent = popupArticle.offer.title;
  clonedPopupArticle.querySelector('.popup__text--address').textContent = popupArticle.offer.address;
  clonedPopupArticle.querySelector('.popup__text--price').innerHTML = `${popupArticle.offer.price} ₽/ночь`;
  clonedPopupArticle.querySelector('.popup__type').textContent = namePlaceType(popupArticle.offer.type);
  clonedPopupArticle.querySelector('.popup__text--capacity').innerHTML = `${popupArticle.offer.rooms} комнат(ы) для ${popupArticle.offer.guests} гостей`;

  //можно оставить просто присвоением в innerHTML?
  clonedPopupArticle.querySelector('.popup__text--time').innerHTML = '';
  clonedPopupArticle.querySelector('.popup__text--time').insertAdjacentHTML('afterbegin' ,`Заезд после ${popupArticle.offer.checkin}, выезд до ${popupArticle.offer.checkout}`);
  clonedPopupArticle.querySelector('.popup__features').innerHTML = '';
  clonedPopupArticle.querySelector('.popup__features').append(insertExistingPlaceFeatures(popupArticle.offer.features));

  clonedPopupArticle.querySelector('.popup__description').textContent = popupArticle.offer.description;
  clonedPopupArticle.querySelector('.popup__photos').innerHTML = insertPlacePhotos(popupArticle.offer.photos);
  clonedPopupArticle.querySelector('.popup__avatar').src = popupArticle.author.avatar;

  return clonedPopupArticle;
}); */

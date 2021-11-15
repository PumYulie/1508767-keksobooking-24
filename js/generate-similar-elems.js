import {ArrayOfGeneratedObjects} from './generate-place-object.js';

const templatePopupArticle = document.querySelector('#card')
  .content
  .querySelector('.popup');

const mapCanvas = document.querySelector('#map-canvas');

const namePlaceType = (string) => {
  switch (string) {
    case 'flat': return 'Квартира';
    case 'bungalow': return 'Бунгало';
    case 'house': return 'Дом';
    case 'palace': return 'Дворец';
    case 'hotel': return 'Отель';
    default: 'Все сломалось';
  }
};

const insertPlacePhotos = (arrayOfURLs) => {
  const photoContainer = document.createElement('div');

  arrayOfURLs.forEach((url) => {
    const clonedIMG = templatePopupArticle.querySelector('.popup__photo').cloneNode(true);
    clonedIMG.src = url;
    photoContainer.appendChild(clonedIMG);
  });

  return photoContainer.innerHTML;
};

const insertExistingPlaceFeatures = (arrayOfStrings) => {
  const templateLiItems = templatePopupArticle.cloneNode(true).querySelectorAll('.popup__feature');
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

//прохожусь по массиву сгенерир.объектов, а возвращаю массив уникальных РАЗМЕТОК
const popupArticlesGenerated = ArrayOfGeneratedObjects.map( (popupArticle) => {
  const clonedPopupArticle = templatePopupArticle.cloneNode(true);

  clonedPopupArticle.querySelector('.popup__title').textContent = popupArticle.offer.title;
  clonedPopupArticle.querySelector('.popup__text--address').textContent = popupArticle.offer.address;
  clonedPopupArticle.querySelector('.popup__text--price').innerHTML = `${popupArticle.offer.price} ₽/ночь`;
  clonedPopupArticle.querySelector('.popup__type').textContent = namePlaceType(popupArticle.offer.type);
  clonedPopupArticle.querySelector('.popup__text--capacity').innerHTML = `${popupArticle.offer.rooms} комнат(ы) для ${popupArticle.offer.guests} гостей`;

  //сбрасывать innerHTML и затем вставлять через .insertAdjacentHTML или можно оставить просто присвоением в innerHTML? (говорили, что небезопасно им бывает пользоваться)
  clonedPopupArticle.querySelector('.popup__text--time').innerHTML = '';
  clonedPopupArticle.querySelector('.popup__text--time').insertAdjacentHTML('afterbegin' ,`Заезд после ${popupArticle.offer.checkin}, выезд до ${popupArticle.offer.checkout}`);
  clonedPopupArticle.querySelector('.popup__features').innerHTML = '';
  clonedPopupArticle.querySelector('.popup__features').append(insertExistingPlaceFeatures(popupArticle.offer.features));

  clonedPopupArticle.querySelector('.popup__description').textContent = popupArticle.offer.description;
  clonedPopupArticle.querySelector('.popup__photos').innerHTML = insertPlacePhotos(popupArticle.offer.photos);
  clonedPopupArticle.querySelector('.popup__avatar').src = popupArticle.author.avatar;

  return clonedPopupArticle;
});

mapCanvas.appendChild(popupArticlesGenerated[0]);

export {popupArticlesGenerated};

import {TYPEOFESTATE, CHECKINS, CHECKOUTS, FEATURES, PHOTOS} from './mock.js';
import {getRandomPositiveInteger} from './utils/get-random-positive-integer.js';
import {getRandomPositiveFloat} from './utils/get-random-positive-float.js';
import {getTwoDigitsFrom01To10} from './utils/get-two-digits-from-01-to-10.js';
import {getRandomArrayElement } from './utils/get-random-array-element.js';
import {createArrayFromRandomElements} from './utils/create-array-from-random-elements.js';

const generatePlaceObject = () => {

  const LATITUDE = getRandomPositiveFloat(35.65000, 35.70000, 5);
  const LONGITUDE = getRandomPositiveFloat(139.70000, 139.80000, 5);

  return {
    author: {
      avatar: `img/avatars/user${getTwoDigitsFrom01To10()}.png`,
    },
    offer: {
      title: 'Вариант, где остановиться',
      address: `${LATITUDE}, ${LONGITUDE}`,
      price: getRandomPositiveInteger(0, 4000),
      type: getRandomArrayElement(TYPEOFESTATE),
      rooms: getRandomPositiveInteger(1, 30),
      guests: getRandomPositiveInteger(1, 60),
      checkin: getRandomArrayElement(CHECKINS),
      checkout: getRandomArrayElement(CHECKOUTS),
      features: createArrayFromRandomElements(FEATURES, getRandomPositiveInteger(0, FEATURES.length)),
      description: 'Текст объявления, написанный прекрасным языком',
      photos: createArrayFromRandomElements(PHOTOS, getRandomPositiveInteger(0, PHOTOS.length)),
    },
    location: {
      lat: LATITUDE,
      lng: LONGITUDE,
    },
  };
};

const ArrayOfGeneratedObjects = Array.from({length: 10}, generatePlaceObject);

export {generatePlaceObject, ArrayOfGeneratedObjects};

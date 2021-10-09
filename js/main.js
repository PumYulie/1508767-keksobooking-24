import {getRandomPositiveInteger} from './utils/get-random-positive-integer.js';
import {getRandomPositiveFloat} from './utils/get-random-positive-float.js';

const TYPEOFESTATE = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECKINS = ['12:00', '13:00', '14:00'];
const CHECKOUTS = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const generateFatObject = () => {

  const getAvatarDigits = () => {
    const number = getRandomPositiveInteger(1, 10);
    return number < 10 ? `0${number}` : `${number}`;
  };

  const getArrayRandomElement = (array) => {
    const index = getRandomPositiveInteger(0, array.length - 1);
    return array[index];
  };

  const createArrayFromRandomElements = (array, arrayLength) => {
    const createdArray = [];
    for (let index = 0; index <= arrayLength; index++) {
      const element = getArrayRandomElement(array);
      if (!createdArray.includes(element)) {
        createdArray.push(element);
      }
    }
    return createdArray;
  };

  const LATITUDE = getRandomPositiveFloat(35.65000, 35.70000, 5);
  const LONGITUDE = getRandomPositiveFloat(139.70000, 139.80000, 5)

  return {
    author: {
      avatar: `img/avatars/user${getAvatarDigits()}.png`,
    },
    offer: {
      title: 'Вариант, где остановиться',
      address: `${LATITUDE}, ${LONGITUDE}`,
      price: getRandomPositiveInteger(0, 4000),
      type: getArrayRandomElement(TYPEOFESTATE),
      rooms: getRandomPositiveInteger(1, 30),
      guests: getRandomPositiveInteger(1, 60),
      checkin: getArrayRandomElement(CHECKINS),
      checkout: getArrayRandomElement(CHECKOUTS),
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

const ArrayOfGeneratedObjects = Array.from({length: 10}, generateFatObject);

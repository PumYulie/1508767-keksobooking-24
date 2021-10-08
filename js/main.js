/* function randomInteger(min, max) {
  // источник learn.javascript.ru/task/random-int-min-max
  if (min < 0 || max < 0) {
    throw('впиши плз 2 разных целых положительных числа, 0 тоже подходит');
  }

  if(min >= max) {
    throw('впиши плз 2 разных целых положительных числа, 0 тоже подходит');
  }

  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function randomIntegerWithDot(min, max, integersAfterDot) {
  if (min < 0 || max < 0) {
    throw('впиши плз 2 разных положительных числа, можно нецелых, 0 тоже подходит');
  }

  if(min >= max) {
    throw('впиши плз 2 разных положительных числа, можно нецелых, 0 тоже подходит');
  }

  integersAfterDot = Math.round(integersAfterDot);
  const num = min + Math.random() * (max - min);
  return +num.toFixed(integersAfterDot);
}

randomInteger(1, 4);
randomIntegerWithDot(1, 3, 3);
 */

import {getRandomPositiveInteger} from './utils/get-random-positive-integer';
import {getRandomPositiveFloat} from './utils/get-random-positive-float';

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
    number < 10 ? (`0${number}`) : String(number);
  };

  const getArrayRandomElement = (array) => {
    const index = getRandomPositiveInteger(0, array.length - 1);
    return array[index];
  };

  const createArrayFromRandomElements = (array, arrayLength) => {
    if (arrayLength > array.length) {
      throw('В массиве не так много элементов, укажи меньшее число вторым аргументом');
    }
    const createdArray = [];
    for (let index = 0; index <= arrayLength; index++) {
      const element = getArrayRandomElement(array);
      if (!createdArray.includes(element)) {
        createdArray.push(element);
      }
    }
    return createdArray;
  };

  return {
    author: {
      avatar: `img/avatars/user${getAvatarDigits()}.png`,
    },
    offer: {
      title: 'Вариант, где остановиться',
      address: `${this.location.lat}, ${this.location.lng}`,
      price: getRandomPositiveInteger(0, 1e12),
      type: getArrayRandomElement(TYPEOFESTATE),
      rooms: getRandomPositiveInteger(1, 1e12),
      guests: getRandomPositiveInteger(1, 1e12),
      checkin: getArrayRandomElement(CHECKINS),
      checkout: getArrayRandomElement(CHECKOUTS),
      features: createArrayFromRandomElements(FEATURES, getRandomPositiveInteger(0, FEATURES.length)),
      description: 'Текст объявления, написанный прекрасным языком',
      photos: createArrayFromRandomElements(PHOTOS, getRandomPositiveInteger(0, PHOTOS.length)),
    },
    location: {
      lat: getRandomPositiveFloat(35.65000, 35.70000, 5),
      lng: getRandomPositiveFloat(139.70000, 139.80000, 5),
    },
  };
};

const ArrayOfGeneratedObjects = Array.from({length: 10}, generateFatObject);

ArrayOfGeneratedObjects();

//console.log(ArrayOfGeneratedObjects);

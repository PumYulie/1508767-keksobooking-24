import {getRandomArrayElement} from './get-random-array-element.js';

const createArrayFromRandomElements = (array, arrayLength) => {
  const createdArray = [];
  for (let index = 0; index <= arrayLength; index++) {
    const element = getRandomArrayElement(array);
    if (!createdArray.includes(element)) {
      createdArray.push(element);
    }
  }
  return createdArray;
};

export {createArrayFromRandomElements};

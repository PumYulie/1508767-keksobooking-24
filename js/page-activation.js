import {disableCollectionElements, enableCollectionElements} from './utils/disable-enable-collection-elements.js';

const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

const blockPage = () => {
  adForm.classList.add('ad-form--disabled');
  disableCollectionElements(adForm.querySelectorAll('fieldset'));
  mapFilters.classList.add('map__filters--disabled');
  disableCollectionElements(mapFilters.querySelectorAll('select'));
  disableCollectionElements(mapFilters.querySelectorAll('fieldset'));
};

const makePageActive = () => {
  adForm.classList.remove('ad-form--disabled');
  enableCollectionElements(adForm.querySelectorAll('fieldset'));
  mapFilters.classList.remove('map__filters--disabled');
  enableCollectionElements(mapFilters.querySelectorAll('select'));
  enableCollectionElements(mapFilters.querySelectorAll('fieldset'));
};

export {blockPage, makePageActive};

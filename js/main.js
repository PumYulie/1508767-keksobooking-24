import {generatePlaceObject} from './place-generated.js';

const ArrayOfGeneratedObjects = Array.from({length: 10}, generatePlaceObject);

ArrayOfGeneratedObjects();

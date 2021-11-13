import {blockPage, makePageActive} from './page-activation.js';
import {createSimilarPlaceTexts} from './generate-similar-elems.js';
import {arrayOfGeneratedObjects} from './generate-place-object.js';

const START_LATITUDE = 35.696;
const START_LONGITUDE = 139.76;
const MAP_SCALE = 13;

const formCoordinatesInput = document.querySelector('#address');
formCoordinatesInput.value = `${START_LATITUDE}, ${START_LONGITUDE}`;

blockPage();

const map = L.map('map-canvas');
const mapLayer = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
);

const mainMarker = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});
const bossMarker = L.marker(
  {
    lat: START_LATITUDE,
    lng: START_LONGITUDE,
  },
  {
    draggable: true,
    icon: mainMarker,
  },
);

const onResetButtonClick = () => {
  bossMarker.setLatLng({
    lat: START_LATITUDE,
    lng: START_LONGITUDE,
  });
  map.setView({
    lat: START_LATITUDE,
    lng: START_LONGITUDE,
  }, MAP_SCALE);

  formCoordinatesInput.value = `${START_LATITUDE}, ${START_LONGITUDE}`;
};

const onMarkerMoveend = (evt) => {
  formCoordinatesInput.value = `${evt.target.getLatLng().lat}, ${evt.target.getLatLng().lng}`;
};

const putOrdinaryMarks = (array) => {
  array.forEach(({location, author, offer}) => {
    const lat = location.lat;
    const lng = location.lng;

    const aMarkerIcon = L.icon({
      iconUrl: '../img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });
    const aMarker = L.marker(
      {
        lat,
        lng,
      },
      {
        icon: aMarkerIcon,
      },
    );

    aMarker
      .addTo(map)
      .bindPopup(createSimilarPlaceTexts(author, offer));
  });
};

//обрабатываю все, когда финализирую отображение карты
const onRenderMapLoad = () => {
  makePageActive();
  putOrdinaryMarks(arrayOfGeneratedObjects);
  mapLayer.addTo(map);
  bossMarker.addTo(map);

  //навешиваю обработчик на движение мыши - когда его удалить???
  bossMarker.on('moveend', (evt) => {
    onMarkerMoveend(evt);
  });
};


map.on('load', () => {
  onRenderMapLoad();
}, {once: true}); // один раз ведь обработчик должен отработать?


map.setView({
  lat: START_LATITUDE,
  lng: START_LONGITUDE,
}, MAP_SCALE);

export {map, formCoordinatesInput, START_LATITUDE, START_LONGITUDE, onResetButtonClick};

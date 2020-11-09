import { Map } from './UI/Map';

class LoadedPlace {
  constructor(coords, address) {
    new Map(coords);
    const headerTitleEl = document.querySelector('header h1');
    headerTitleEl.textContent = address;
  }
}

const url = new URL(location.href);
const queryParams = url.searchParams;
const coordinates = {
  lat: +queryParams.get('lat'),
  lng: +queryParams.get('lng'),
};

const address = queryParams.get('address');

new LoadedPlace(coordinates, address);

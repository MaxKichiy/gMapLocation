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
// const coordinates = {
//   lat: +queryParams.get('lat'),
//   lng: +queryParams.get('lng'),
// };
const locId = queryParams.get('location');
fetch('http://localhost:3331/location/' + locId)
  .then((res) => {
    if (res.status === 404) {
      throw new Error('Could not find location!');
    }
    return res.json();
  })
  .then((data) => {
    console.log(data);
    new LoadedPlace(data.coordinates, data.address);
  })
  .catch((err) => {
    alert(err.message);
  });

// const address = queryParams.get('address');

// new LoadedPlace(coordinates, address);

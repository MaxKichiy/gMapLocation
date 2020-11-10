import { Map } from './UI/Map';
import { Modal } from './UI/Modal';
import { getAddressFromCoords, getCoordsFromAddress } from './Utility/Location';

class PlaceFinder {
  constructor() {
    const addressForm = document.querySelector('form');
    const locateUserBtn = document.getElementById('locate-btn');
    this.shareBtn = document.getElementById('share-btn');

    locateUserBtn.addEventListener('click', this.locateUserHandler.bind(this));
    this.shareBtn.addEventListener('click', this.sharePlaceHandler);
    addressForm.addEventListener('submit', this.findAddressFormHandler.bind(this));
  }

  sharePlaceHandler() {
    const sharedLinkInputElement = document.getElementById('share-link');
    if (!navigator.clipboard) {
      sharedLinkInputElement.select();
      return;
    }

    navigator.clipboard
      .writeText(sharedLinkInputElement.value)
      .then(() => {
        alert('Copied into clipboard');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  selectPlace(coordinates, address) {
    if (this.map) {
      this.map.render(coordinates);
    } else {
      this.map = new Map(coordinates);
    }
    fetch('http://localhost:3331/add-location', {
      method: 'POST',
      body: JSON.stringify({
        address: address,
        coordinates: coordinates,
      }),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const locationId = data.locId;
        this.shareBtn.disabled = false;
        const sharedLinkInputElement = document.getElementById('share-link');
        sharedLinkInputElement.value = `${location.origin}/my-place?location=${locationId}`;
      });
  }

  locateUserHandler() {
    if (!navigator.geolocation) {
      alert('Функция геопопозиции недоступна в вашем браузере. Введите адресс вручнуюю');
      return;
    }
    const modal = new Modal('loading-modal-content', 'Загрузка геопозиции, пожалуйста подождите');
    modal.show();
    navigator.geolocation.getCurrentPosition(
      async (successResult) => {
        const coordinates = {
          lat: successResult.coords.latitude,
          lng: successResult.coords.longitude,
        };
        const address = await getAddressFromCoords(coordinates);
        modal.hide();
        this.selectPlace(coordinates, address);
      },
      (error) => {
        modal.hide();
        alert('К сожалению не можем загрузить ваши координаты, введите их вручную.');
      },
    );
  }

  async findAddressFormHandler(event) {
    event.preventDefault();
    const address = event.target.querySelector('input').value;
    if (!address || address.trim().length === 0) {
      alert('Неверный адрес, попробуйте еще раз');
      return;
    }
    const modal = new Modal('loading-modal-content', 'Загрузка геопозиции, пожалуйста подождите');
    modal.show();
    try {
      const coordinates = await getCoordsFromAddress(address);
      this.selectPlace(coordinates, address);
    } catch (error) {
      alert(error.message);
    }
    modal.hide();
  }
}

const placeFinder = new PlaceFinder();

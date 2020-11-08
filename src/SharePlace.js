import { Map } from './UI/Map';
import { Modal } from './UI/Modal';
import { getCoordsFromAddress } from './Utility/Location';

class PlaceFinder {
  constructor() {
    const addressForm = document.querySelector('form');
    const locateUserBtn = document.getElementById('locate-btn');

    locateUserBtn.addEventListener('click', this.locateUserHandler.bind(this));
    addressForm.addEventListener('submit', this.findAddressFormHandler.bind(this));
  }

  selectPlace(coordinates) {
    if (this.map) {
      this.map.render(coordinates);
    } else {
      this.map = new Map(coordinates);
    }
  }

  locateUserHandler() {
    if (!navigator.geolocation) {
      alert('Функция геопопозиции недоступна в вашем браузере. Введите адресс вручнуюю');
      return;
    }
    const modal = new Modal('loading-modal-content', 'Загрузка геопозиции, пожалуйста подождите');
    modal.show();
    navigator.geolocation.getCurrentPosition(
      (successResult) => {
        modal.hide();
        const coordinates = {
          lat: successResult.coords.latitude,
          lng: successResult.coords.longitude,
        };
        this.selectPlace(coordinates);
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
      this.selectPlace(coordinates);
    } catch (error) {
      alert(error.message);
    }
    modal.hide();
  }
}

const placeFinder = new PlaceFinder();

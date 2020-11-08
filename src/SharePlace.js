import { Map } from './UI/Map';
import { Modal } from './UI/Modal';

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

  findAddressFormHandler() {}
}

const placeFinder = new PlaceFinder();

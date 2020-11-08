import { Modal } from './UI/Modal';

class PlaceFinder {
  constructor() {
    const addressForm = document.querySelector('form');
    const locateUserBtn = document.getElementById('locate-btn');

    locateUserBtn.addEventListener('click', this.locateUserHandler);
    addressForm.addEventListener('submit', this.findAddressFormHandler);
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
        console.log(coordinates);
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

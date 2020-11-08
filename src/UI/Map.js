export class Map {
  constructor(coords) {
    this.coordinates = coords;
    this.render();
  }

  render() {
    if (!google) {
      alert('Не можем загрузить карту попробуйте позже');
      return;
    }

    const map = new google.maps.Map(document.getElementById('map'), {
      center: this.coordinates,
      zoom: 16,
    });

    new google.maps.Marker({
      position: this.coordinates,
      map: map,
    });
  }
}

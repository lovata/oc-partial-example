import loadGoogleMapsApi from 'load-google-maps-api';

export default new class ContactMap {
  constructor() {
    this.mapSelector = 'map';
    this.idSelector = 'data-api-key';
    this.coordinatesSelector = 'data-coordinates';

    this.markerPath = 'data-marker-path';
    this.maxWidth = 280;

    this.gmapKeyNotFoundText = 'api-key is not found';
    this.gmapCoordinatesNotFound = 'coordinates is not found';

    this.handler();
  }

  handler() {
    window.addEventListener('load', () => {
      this.initMap();
    });
  }

  initMap() {
    const map = document.querySelector(`.${this.mapSelector}`);

    if (!map) return;

    const key = map.getAttribute(this.idSelector);

    if (!key) {
      throw new Error(this.gmapKeyNotFoundText);
    }

    const coordinates = map.getAttribute(this.coordinatesSelector).split(',');

    if (!coordinates.length) {
      throw new Error(this.gmapCoordinatesNotFound);
    }

    const markerPath = map.getAttribute(this.markerPath);

    this.drawMap(key, coordinates, markerPath);
  }

  drawMap(key, coordinates = [0, 0], markerPath) {
    loadGoogleMapsApi({ key }).then((googleMaps) => {
      const center = {
        lat: parseFloat(coordinates[0]),
        lng: parseFloat(coordinates[1]),
      };

      const map = new googleMaps.Map(document.querySelector(`.${this.mapSelector}`), {
        center,
        zoom: 14,
      });
      const marker = new googleMaps.Marker({ position: center, map, icon: markerPath });

      /* TODO: set correct path to popup partial */

      $.request('onAjax', {
        update: { 'content/contact/contact-popup': `.${this.mapSelector}` },
        success: (res) => {
          const content = res['content/contact/contact-popup'];

          /* eslint-disable new-cap  */
          const infoWindow = new googleMaps.infoWindow({ content, maxWidth: this.maxWidth });
          /* eslint-enable */

          infoWindow.open(map, marker);
          marker.addListener('click', () => {
            infoWindow.open(map, marker);
          });
        },
      });
    }).catch((error) => { throw new Error(error); });
  }
}();

import { Component } from '@angular/core';

import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapaComponent {
  private map: any;
  private marker: any;
  private markerModal: any;
  public description: string | undefined;
  public latitude: string | undefined;
  public longitude: string | undefined;

  constructor() {}

  ngAfterViewInit(): void {
    this.map = L.map('map').setView([0, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(this.map);

    this.markerModal = new bootstrap.Modal(
      document.getElementById('markerModal'),
      {
        backdrop: 'static',
        keyboard: false,
      }
    );

    this.map.on('click', (e) => {
      const latLng = e.latlng;
      this.latitude = latLng.lat;
      this.longitude = latLng.lng;

      this.markerModal.show();
    });
  }

  addMarker(): void {
    if (this.marker) {
      this.marker
        .setLatLng([this.latitude, this.longitude])
        .bindPopup(this.description)
        .openPopup();
    } else {
      this.marker = L.marker([this.latitude, this.longitude])
        .addTo(this.map)
        .bindPopup(this.description)
        .openPopup();
    }

    this.markerModal.hide();
  }
}

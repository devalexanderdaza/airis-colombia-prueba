import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Renderer2,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('divMap') divMap!: ElementRef;
  @ViewChild('inputPlaces') inputPlaces!: ElementRef;

  mapa!: google.maps.Map;
  markers: google.maps.Marker[];
  distancia!: string;
  formMapas!: FormGroup;
  mapVisible = false;
  ventasVisible = false;
  markersVisible = false;
  selectedButton = '';

  constructor(private renderer: Renderer2) {
    this.markers = [];
    this.formMapas = new FormGroup({
      busqueda: new FormControl(''),
      direccion: new FormControl(''),
      referencia: new FormControl(''),
      ciudad: new FormControl(''),
      provincia: new FormControl(''),
      region: new FormControl(''),
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const opciones = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          await this.cargarMapa(position);
          this.cargarAutocomplete();
        },
        null,
        opciones
      );
    } else {
      console.log('Navegador no compatible');
    }
  }

  onSubmit() {
    console.log('Datos del formulario: ', this.formMapas.value);
  }

  mapRuta() {
    const directionService = new google.maps.DirectionsService();
    const directionRender = new google.maps.DirectionsRenderer();

    directionRender.setMap(this.mapa);

    directionService.route(
      {
        destination: 'Cartagena, Colombia',
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (resultado) => {
        console.log(resultado);
        directionRender.setDirections(resultado);
        this.distancia = resultado.routes[0].legs[0].distance.text;
      }
    );
  }

  private cargarAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(
      this.renderer.selectRootElement(this.inputPlaces.nativeElement),
      {
        componentRestrictions: {
          country: ['CO'],
        },
        fields: ['address_components', 'geometry'],
        types: ['address'],
      }
    );

    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place: any = autocomplete.getPlace();
      console.log('El place completo es:', place);

      this.mapa.setCenter(place.geometry.location);
      const marker = new google.maps.Marker({
        position: place.geometry.location,
      });

      marker.setMap(this.mapa);
      this.llenarFormulario(place);
    });
  }

  llenarFormulario(place: any) {
    const addressNameFormat: any = {
      street_number: 'short_name',
      route: 'long_name',
      administrative_area_level_1: 'short_name',
      administrative_area_level_2: 'short_name',
      administrative_area_level_3: 'short_name',
      country: 'long_name',
    };

    const getAddressComp = (type: any) => {
      for (const component of place.address_components) {
        if (component.types[0] === type) {
          return component[addressNameFormat[type]];
        }
      }
      return ' ';
    };

    const componentForm = {
      direccion: 'location',
      ciudad: 'administrative_area_level_3',
      provincia: 'administrative_area_level_2',
      region: 'administrative_area_level_1',
    };

    Object.entries(componentForm).forEach((entry) => {
      const [key, value] = entry;
      this.formMapas.controls[key].setValue(getAddressComp(value));
    });

    this.formMapas.controls['direccion'].setValue(
      getAddressComp('route') + ' ' + getAddressComp('street_number')
    );
  }

  cargarMapa(position: any) {
    const opciones = {
      center: new google.maps.LatLng(
        position.coords.latitude,
        position.coords.longitude
      ),
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };

    this.mapa = new google.maps.Map(
      this.renderer.selectRootElement(this.divMap.nativeElement),
      opciones
    );

    const markerPosition = new google.maps.Marker({
      position: this.mapa.getCenter(),
      title: 'Yeizer',
    });

    markerPosition.setMap(this.mapa);
    this.markers.push(markerPosition);
  }

  openMap() {
    this.mapVisible = true;
    this.ventasVisible = false;
    this.markersVisible = true;
    this.selectedButton = 'map';
  }

  openVentas() {
    this.ventasVisible = true;
    this.mapVisible = false;
    this.markersVisible = false;
    this.selectedButton = 'ventas';
  }
}

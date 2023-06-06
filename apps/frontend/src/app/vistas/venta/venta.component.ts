import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../servicios/api/api.service';
import { VentasI } from '../../modelos/venta.interface';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.scss']
})
export class VentaComponent implements OnInit {
  ventasData: VentasI[] = [];
  meses: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.obtenerVentas();
  }

  agruparVentasPorMes(ventas: VentasI[]): any[] {
    const ventasPorMes: any[] = [];

    ventas.forEach((venta) => {
      const fecha = new Date(venta.createdAt);
      const mes = fecha.getMonth();
      const nombreMes = this.meses[mes];

      const ventaExistente = ventasPorMes.find((item) => item.mes === nombreMes);

      if (ventaExistente) {
        ventaExistente.cantidadInmuebles += 1;
        ventaExistente.totalVentas += Number(venta.price);
      } else {
        ventasPorMes.push({
          mes: nombreMes,
          cantidadInmuebles: 1,
          totalVentas: Number(venta.price)
        });
      }
    });

    return ventasPorMes;
  }

  obtenerVentas() {
    const fechaActual = new Date();
    const anioActual = fechaActual.getFullYear();

    this.api.ventas().subscribe(
      (response) => {
        console.log(response);
        const ventas = response.data;
        const ventasAnioActual = ventas.filter((venta) => new Date(venta.createdAt).getFullYear() === anioActual);
        this.ventasData = this.agruparVentasPorMes(ventasAnioActual);
        this.sumarPreciosPorMes();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  sumarPreciosPorMes() {
    this.ventasData.forEach((venta) => {
      venta.totalVentas = this.calcularTotalVentasPorMes(venta.mes);
    });
  }

  calcularTotalVentasPorMes(mes: string): string {
    const totalVentas = this.ventasData
      .filter((venta) => venta.mes === mes)
      .reduce((total, venta) => total + Number(venta.totalVentas), 0);

    return this.formatoMoneda(totalVentas);
  }

  formatoMoneda(valor: number): string {
    return valor.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
  }
}

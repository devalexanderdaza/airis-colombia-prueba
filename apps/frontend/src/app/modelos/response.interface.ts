import {VentasI} from './venta.interface'
export interface ResponseI {
    status: string;
    response: string;
    data: VentasI[]
}
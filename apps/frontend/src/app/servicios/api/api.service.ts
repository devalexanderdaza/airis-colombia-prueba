import { Injectable } from '@angular/core';
import {LoginI} from '../../modelos/login.interface';
import {ResponseI} from '../../modelos/response.interface';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url: string = 'https://airis.onrender.com/v1/';

  constructor(private http: HttpClient) { }

  loginByEmail(form:LoginI): Observable<ResponseI>{
    let direccion = this.url + "auth/login"
    return this.http.post<ResponseI>(direccion, form)
  }

  ventas(): Observable<ResponseI>{
    let direccion = this.url + "sales"
    return this.http.get<ResponseI>(direccion)
  }
}

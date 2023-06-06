import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { LoginI } from '../../modelos/login.interface';
import { ResponseI } from '../../modelos/response.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url: string = 'http://localhost:5000/api/';

  constructor(private http: HttpClient) {}

  loginByEmail(form: LoginI) {
    return {
      data: 'token',
    };
  }

  ventas(): Observable<ResponseI> {
    let direccion = this.url + 'sales';
    return this.http.get<ResponseI>(direccion);
  }
}

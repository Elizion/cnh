import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _userIsAuthenticated = true;

  get userIsAuthenticated() {
    return this._userIsAuthenticated;
  }

  constructor(
    private httpClient: HttpClient
  ) {}

  headers(token) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token
      })
    };
    return httpOptions;
  }

  bearer(token) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + token
      })
    };
    return httpOptions;
  }

  token() {
    this._userIsAuthenticated = true;
    return this.httpClient.get('https://siarhqamovil.cnh.gob.mx/api/token/autorizacion?solicitante=app-movil');
  }

  login(token: string, user: string, password: string) {
    this._userIsAuthenticated = true;
    return this.httpClient.get('https://siarhqamovil.cnh.gob.mx/api/token/acceso?usuario=' + user + '&contrasenia=' + password,
      this.headers(token)
    );
  }

  user(tokenF: string) {
    return this.httpClient.get('https://siarhqamovil.cnh.gob.mx/api/empleado/datos/token',
      this.bearer(tokenF)
    );
  }

  logout() {
    this._userIsAuthenticated = false;
    window.localStorage.removeItem('user');
  }

}

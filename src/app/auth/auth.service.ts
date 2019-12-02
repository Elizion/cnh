import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _userIsAuthenticated = true;
  private _userId = '1000';

  get userId() {
    return this._userId;
  }

  constructor(private http: HttpClient) { }

  get userIsAuthenticated() {
    return this._userIsAuthenticated;
  }

  generateToken() {
    this._userIsAuthenticated = true;
    return this.http.get(`https://siarhqamovil.cnh.gob.mx/api/token/autorizacion?solicitante=app-movil`);
  }

  logout() {
    this._userIsAuthenticated = false;
  }


}

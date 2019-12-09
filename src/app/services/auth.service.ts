import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Constants as CONST } from '../config/config.const';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userAuthenticated = true;
  private urlAuth: string = CONST.PROTOCOL + CONST.HOST + CONST.BASE + CONST.MODULE[0];
  private urlEmployee: string = CONST.PROTOCOL + CONST.HOST + CONST.BASE + CONST.MODULE[1];

  get userIsAuthenticated() {
    return this.userAuthenticated;
  }

  constructor(
    private httpClient: HttpClient
  ) { }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Error: ' + error.error.message);
    } else {
      console.error('Code: ' + error.status);
      console.error('Body: ' + JSON.stringify(error.error));
    }
    return throwError('Something bad happened; please try again later.');
  }

  headers1(token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  CONST.CONTENT_TYPE,
        Authorization: token
      })
    };
    return httpOptions;
  }

  headers2(token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  CONST.CONTENT_TYPE,
        Authorization: 'Bearer ' + token
      })
    };
    return httpOptions;
  }

  token() {
    this.userAuthenticated = true;
    return this.httpClient.get( this.urlAuth + 'autorizacion?solicitante=app-movil')
                          .pipe(retry(CONST.RETRY), catchError(this.handleError));
  }

  login(token: string, user: string, password: string) {
    this.userAuthenticated = true;
    return this.httpClient.get(this.urlAuth + 'acceso?usuario=' + user + '&contrasenia=' + password, this.headers1(token))
                          .pipe(retry(CONST.RETRY), catchError(this.handleError));
  }

  user(tokenF: string) {
    this.userAuthenticated = true;
    return this.httpClient.get(this.urlEmployee + 'datos/token', this.headers2(tokenF))
                          .pipe(retry(CONST.RETRY), catchError(this.handleError));
  }

  logout() {
    this.userAuthenticated = false;
    return window.localStorage.removeItem('user');
  }

}

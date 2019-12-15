import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Constants as CONST } from '../config/config.const';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthorization = true;
  private urlAuth: string = CONST.PROTOCOL + CONST.HOST + CONST.BASE + CONST.MODULE[0];  

  get userIsAuthenticated() {
    return this.isAuthorization;
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

  headers(token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  CONST.APPLICATION_JSON,
        Authorization: token
      })
    };
    return httpOptions;
  }



  token() {
    this.isAuthorization = false;
    return this.httpClient.get( this.urlAuth + 'autorizacion?solicitante=app-movil')
                          .pipe(retry(CONST.ONE), catchError(this.handleError));
  }

  login(token: string, user: string, password: string) {
    this.isAuthorization = false;
    return this.httpClient.get(this.urlAuth + 'acceso?usuario=' + user + '&contrasenia=' + password, this.headers(token))
                          .pipe(retry(CONST.ZERO), catchError(this.handleError));
  }



  logout() {
    this.isAuthorization = false;
    return window.localStorage.removeItem('user');
  }

}

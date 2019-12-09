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
  ) {}

  headers(token) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: token
      })
    };
    return httpOptions;
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred: ' + error.error.message);
    } else {
      console.error('Backend returned code: ' + error.status);
      console.error('Body was: ' + error.error );
    }
    return throwError('Something bad happened; please try again later.');
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

    this.userAuthenticated = true;

    return this.httpClient.get( this.urlAuth + 'autorizacion?solicitante=app-movil')
                          .pipe(
                              retry(CONST.RETRY),
                              catchError(this.handleError)
                            );

  }

  login(token: string, user: string, password: string) {
    this.userAuthenticated = true;
    return this.httpClient.get(this.urlAuth + 'acceso?usuario=' + user + '&contrasenia=' + password, this.headers(token))
                          .pipe(
                              retry(CONST.RETRY),
                              catchError(this.handleError)
                            );
  }

  user(tokenF: string) {
    return this.httpClient.get(this.urlEmployee + 'datos/token', this.bearer(tokenF))
                          .pipe(
                              retry(CONST.RETRY),
                              catchError(this.handleError)
                            );
  }

  logout() {
    this.userAuthenticated = false;
    window.localStorage.removeItem('user');
  }

}

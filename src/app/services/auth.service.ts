import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { GlobalService } from './global.service';
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
    private httpClient: HttpClient,
    private globalService: GlobalService
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


  token() {
    this.isAuthorization = false;
    return this.httpClient.get( this.urlAuth + 'autorizacion?solicitante=app-movil')
                          .pipe(retry(CONST.ONE), catchError(this.handleError));
  }

  login(token: string, contentType: string, user: string, password: string) {
    this.isAuthorization = false;
    return this.httpClient.get(this.urlAuth + 'acceso?usuario=' + user + '&contrasenia=' + password,
        this.globalService.headers(token, contentType))
                          .pipe(retry(CONST.ZERO), catchError(this.handleError));
  }

  logout() {
    this.isAuthorization = false;
    return window.localStorage.removeItem('user');
  }

}

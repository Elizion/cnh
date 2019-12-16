import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  token() {
    this.isAuthorization = false;
    return this.httpClient.get( this.urlAuth + 'autorizacion?solicitante=app-movil')
                          .pipe(retry(CONST.ONE), catchError(this.globalService.handleError));
  }
  login(token: string, user: string, password: string) {
    this.isAuthorization = false;
    return this.httpClient.get(this.urlAuth + 'acceso?usuario=' + user + '&contrasenia=' + password,
        this.globalService.headers(token, CONST.APPLICATION_JSON))
                          .pipe(retry(CONST.ZERO), catchError(this.globalService.handleError));
  }
  logout() {
    this.isAuthorization = false;
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('token');
    return this.isAuthorization;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { GlobalService } from './global.service';
import { Constants as CONST } from '../config/config.const';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private urlEmployee: string = CONST.PROTOCOL + CONST.HOST + CONST.BASE + CONST.MODULE[1];

  constructor(
    private httpClient: HttpClient,
    private globalService: GlobalService
  ) {}

  token: string;

  personal(personId: string) {
    return this.httpClient.get('https://siarhqamovil.cnh.gob.mx/api/avisos/empleado?personId=' + personId);
  }

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
        Authorization: 'Bearer ' + token
      })
    };
    return httpOptions;
  }

  profile() {
    this.token = this.globalService.token();
    return this.httpClient.get(this.urlEmployee + 'datos/token', this.headers(this.token))
                          .pipe(retry(CONST.ZERO), catchError(this.handleError));
  }

}

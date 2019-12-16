import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Constants as CONST } from '../config/config.const';

@Injectable({
 providedIn: 'root'
})
export class PayrollService {

  private urlPayroll: string = CONST.PROTOCOL + CONST.HOST + CONST.BASE + CONST.MODULE[4];

  constructor( private httpClient: HttpClient ) {}

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Error: ' + error.error.message);
    } else {
      console.error('Body: ' + JSON.stringify(error.error));
    }
    return throwError('Something bad happened; please try again later.');
  }

  headers() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  CONST.X_WWW_FORM_URLENCODED,
      })
    };
    return httpOptions;
  }

  payroll(personId: string, dateStart: string, dateEnd: string) {
    return this.httpClient.get(
      this.urlPayroll + 'foliosNomina?personId=' + personId + '&fechaInicio=' + dateStart + '&fechaFin=' + dateEnd
    );
  }

  download(personId: string, consolidationId: string) {
    return this.httpClient.get(this.urlPayroll + 'descargaBase64?personId=' + personId + '&consolidationId=' + consolidationId);
  }

}

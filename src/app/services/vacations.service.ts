import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Constants as CONST } from '../config/config.const';
@Injectable({
 providedIn: 'root'
})
export class VacationsService {

  private urlVacations: string = CONST.PROTOCOL + CONST.HOST + CONST.BASE + CONST.MODULE[2];

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

  file(id: number, avaible: number, period: string, pending: number, list: any[]) {
     const data = {
      personId: id,
      diasDisponibles: avaible,
      periodoEscalonado: period,
      diasPendientes: pending,
      listaVacaciones: list
    };
    return this.httpClient.post(this.urlVacations+ 'formato/solicitudBase64/', data);
  }

  postVacations(personId) {
    const body = new HttpParams().set('personId', personId);
    return this.httpClient.post( this.urlVacations + 'consulta',
      body.toString(), { headers: new HttpHeaders().set('Content-Type', CONST.X_WWW_FORM_URLENCODED ) }
    );
  }

  postAddVacations(id: number, avaible: number, start: string, end: string, list: any[]) {
     const data = {
      personId: id,
      fechaInicio: start,
      fechaFin: end,
      diasDisponibles: avaible,
      diasVacaciones: list
    };
    return this.httpClient.post(this.urlVacations+ 'agregar/', data);
  }

}

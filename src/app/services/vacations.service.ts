import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { VacationsModel } from '../models/vacations.model';
import { Constants as CONST } from '../config/config.const';
@Injectable({
 providedIn: 'root'
})
export class VacationsService {

  private urlVacations: string = CONST.PROTOCOL + CONST.HOST + CONST.BASE + CONST.MODULE[2];

  //https://siarhqamovil.cnh.gob.mx/api/vacaciones/formato/solicitud

  constructor(
    private httpClient: HttpClient
  ) {}

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

  file(list: any[]) {

     const data = {
      personId: 283597,
      diasDisponibles: 10,
      periodoEscalonado: 'N',
      diasPendientes: 0,
      listaVacaciones: list
    };

    return this.httpClient.post(this.urlVacations+ 'formato/solicitud/', data);

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

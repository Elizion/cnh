import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Constants as CONST } from '../config/config.const';
@Injectable({
 providedIn: 'root'
})
export class VacationsService {

  private urlVacations: string = CONST.PROTOCOL + CONST.HOST + CONST.BASE + CONST.MODULE[2];

  constructor( private httpClient: HttpClient ) {}

  file(id: number, avaible: number, period: string, pending: number, list: any[]) {
     const data = {
      personId: id,
      diasDisponibles: avaible,
      periodoEscalonado: period,
      diasPendientes: pending,
      listaVacaciones: list
    };
     return this.httpClient.post(this.urlVacations + 'formato/solicitudBase64/', data);
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
     return this.httpClient.post(this.urlVacations + 'agregar/', data);
  }

  save(id: string, inicial: string, ingreso: string, pendientes: string, array: any[]) {
    const data = {
      personId: id,
      fechaInicial: inicial,
      fechaIngresoFormat: ingreso,
      diasPendientes: pendientes,
      diasVacaciones: array
    };
    return this.httpClient.post(this.urlVacations + 'guardar/', data);
  }

}

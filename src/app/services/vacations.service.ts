import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { GlobalService } from '../services/global.service';
import { retry, catchError } from 'rxjs/operators';
import { Constants as CONST } from '../config/config.const';
@Injectable({
 providedIn: 'root'
})
export class VacationsService {

  token: string;

  private urlVacations: string = CONST.PROTOCOL + CONST.HOST + CONST.BASE + CONST.MODULE[2];

  constructor(
    private httpClient: HttpClient,
    private globalService: GlobalService
  ) { this.token = this.globalService.token(); }

  /*
  postVacations(personId) {
    const body = new HttpParams().set('personId', personId);
    return this.httpClient.post( this.urlVacations + 'consulta',
      body.toString(), { headers: new HttpHeaders().set('Content-Type', CONST.X_WWW_FORM_URLENCODED ) }
    );
  }
  */
  postVacations(personId: any) {
    const body = new HttpParams().set('personId', personId);
    return this.httpClient.post( this.urlVacations + 'consulta', body.toString(),
        this.globalService.headers(this.token, CONST.X_WWW_FORM_URLENCODED))
                          .pipe(retry(CONST.ZERO), catchError(this.globalService.handleError));
  }

  postAddVacations(id: number, avaible: number, start: string, end: string, list: any[]) {
     const data = {
      personId: id,
      fechaInicio: start,
      fechaFin: end,
      diasDisponibles: avaible,
      diasVacaciones: list
    };
     return this.httpClient.post(this.urlVacations + 'agregar/', data,
        this.globalService.headers(this.token, CONST.APPLICATION_JSON))
                          .pipe(retry(CONST.ZERO), catchError(this.globalService.handleError));
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
  update(id: string, date: string) {
    return this.httpClient.get(this.urlVacations + 'modificar?personId=' + id + '&fechaUltimoPeriodo=' + date,
        this.globalService.headers(this.token, CONST.APPLICATION_JSON))
                          .pipe(retry(CONST.ZERO), catchError(this.globalService.handleError));
  }
  commitUpdate(data: any) {
    return this.httpClient.post(this.urlVacations + 'guardarModificacion/', data,
        this.globalService.headers(this.token, CONST.APPLICATION_JSON))
                          .pipe(retry(CONST.ZERO), catchError(this.globalService.handleError));
  }
  downloadUpdate(data: any) {
    return this.httpClient.post(this.urlVacations + 'formato/solicitudModificacionBase64/', data,
        this.globalService.headers(this.token, CONST.APPLICATION_JSON))
                          .pipe(retry(CONST.ZERO), catchError(this.globalService.handleError));
  }
  cancel(id: string, date: string) {
    return this.httpClient.get(this.urlVacations + 'cancelar?personId=' + id + '&fechaUltimoPeriodo=' + date,
        this.globalService.headers(this.token, CONST.APPLICATION_JSON))
                          .pipe(retry(CONST.ZERO), catchError(this.globalService.handleError));
  }
  commitCancel(data: any) {
    return this.httpClient.post(this.urlVacations + 'guardarCancelacion/', data,
        this.globalService.headers(this.token, CONST.APPLICATION_JSON))
                          .pipe(retry(CONST.ZERO), catchError(this.globalService.handleError));
  }
  downloadCancel(data: any) {
    return this.httpClient.post(this.urlVacations + 'formato/solicitudCancelacionBase64/', data,
        this.globalService.headers(this.token, CONST.APPLICATION_JSON))
                          .pipe(retry(CONST.ZERO), catchError(this.globalService.handleError));
  }
  file(id: number, avaible: number, period: string, pending: number, list: any[]) {
     const data = {
      personId: id,
      diasDisponibles: avaible,
      periodoEscalonado: period,
      diasPendientes: pending,
      listaVacaciones: list
    };
     return this.httpClient.post(this.urlVacations + 'formato/solicitudBase64/', data,
         this.globalService.headers(this.token, CONST.APPLICATION_JSON))
                           .pipe(retry(CONST.ZERO), catchError(this.globalService.handleError));
  }
  
}

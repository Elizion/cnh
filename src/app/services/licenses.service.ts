import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { GlobalService } from './global.service';
import { Constants as CONST } from '../config/config.const';
@Injectable({
 providedIn: 'root'
})
export class LicensesService {
  token: string;
  private urlLicenses: string = CONST.PROTOCOL + CONST.HOST + CONST.BASE + CONST.MODULE[5];
  constructor(
    private httpClient: HttpClient,
    private globalService: GlobalService ) {
    this.token = this.globalService.token();
  }
  licenses(idPerson: string) {
    return this.httpClient.get(this.urlLicenses + 'historico?personId=' + idPerson,
        this.globalService.headers(this.token, CONST.APPLICATION_JSON))
        .pipe(retry(CONST.ZERO), catchError(this.globalService.handleError));
  }
  historical(idPerson: string, anioAniversario: string) {
    return this.httpClient.get(this.urlLicenses + 'detalle?personId=' + idPerson + '&anioAniversario=' + anioAniversario ,
        this.globalService.headers(this.token, CONST.APPLICATION_JSON))
        .pipe(retry(CONST.ZERO), catchError(this.globalService.handleError));
  }
}

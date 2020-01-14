import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { GlobalService } from './global.service';
import { Constants as CONST } from '../config/config.const';
@Injectable({
 providedIn: 'root'
})
export class NoticesService {

  token: string;

  private urlNotices: string = CONST.PROTOCOL + CONST.HOST + CONST.BASE + CONST.MODULE[3];

  constructor(
    private httpClient: HttpClient,
    private globalService: GlobalService
    ) {}

  personal(idPerson: number) {
    this.token = this.globalService.token();
    return this.httpClient.get(this.urlNotices + 'individual?personId=' + idPerson,
        this.globalService.headers(this.token, CONST.APPLICATION_JSON))
        .pipe(retry(CONST.ZERO), catchError(this.globalService.handleError));
  }

  general() {
    return this.httpClient.get(this.urlNotices + 'general',
        this.globalService.headers(this.token, CONST.APPLICATION_JSON))
        .pipe(retry(CONST.ZERO), catchError(this.globalService.handleError));
  }

  download(id: string) {
    return this.httpClient.get(this.urlNotices + 'descargaB64?idArchivo=' + id,
        this.globalService.headers(this.token, CONST.APPLICATION_JSON))
        .pipe(retry(CONST.ZERO), catchError(this.globalService.handleError));
  }

}

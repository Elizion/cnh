import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants as CONST } from '../config/config.const';
@Injectable({
 providedIn: 'root'
})
export class NoticesService {
  private urlNotices: string = CONST.PROTOCOL + CONST.HOST + CONST.BASE + CONST.MODULE[3];
  constructor( private httpClient: HttpClient ) {}
  personal(idPerson: number) {
    return this.httpClient.get(this.urlNotices + 'individual?personId=' + idPerson);
  }
  general() {
    return this.httpClient.get(this.urlNotices + 'general');
  }
  download(id: string) {
    return this.httpClient.get(this.urlNotices + 'descargaB64?idArchivo=' + id);
  }
}

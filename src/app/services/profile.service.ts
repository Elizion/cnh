import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  profile() {
    this.token = this.globalService.token();
    return this.httpClient.get(this.urlEmployee + 'datos/token',
      this.globalService.headers(this.token, CONST.APPLICATION_JSON ))
                        .pipe(retry(CONST.ZERO), catchError(this.globalService.handleError));
  }
}

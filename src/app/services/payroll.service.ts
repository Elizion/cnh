import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { GlobalService } from '../services/global.service';
import { retry, catchError } from 'rxjs/operators';
import { Constants as CONST } from '../config/config.const';

@Injectable({
 providedIn: 'root'
})
export class PayrollService {

  token: string;

  private urlPayroll: string = CONST.PROTOCOL + CONST.HOST + CONST.BASE + CONST.MODULE[4];

  constructor(
    private httpClient: HttpClient,
    private globalService: GlobalService
  ) { this.token = this.globalService.token(); }

  payroll(personId: string, dateStart: string, dateEnd: string) {
    return this.httpClient.get(this.urlPayroll + 'foliosNomina?personId=' + personId + '&fechaInicio=' + dateStart + '&fechaFin=' + dateEnd,
        this.globalService.headers(this.token, CONST.APPLICATION_JSON))
                          .pipe(retry(CONST.ZERO), catchError(this.globalService.handleError));
  }

  download(personId: string, consolidationId: string) {
    return this.httpClient.get(this.urlPayroll + 'descargaBase64?personId=' + personId + '&consolidationId=' + consolidationId,
        this.globalService.headers(this.token, CONST.APPLICATION_JSON))
                          .pipe(retry(CONST.ZERO), catchError(this.globalService.handleError));
  }

}

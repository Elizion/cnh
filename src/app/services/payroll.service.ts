import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { GlobalService } from '../services/global.service';
import { Constants as CONST } from '../config/config.const';

@Injectable({
 providedIn: 'root'
})
export class PayrollService {

  private urlPayroll: string = CONST.PROTOCOL + CONST.HOST + CONST.BASE + CONST.MODULE[4];

  constructor(
    private httpClient: HttpClient,
    private globalService: GlobalService
  ) {}

  payroll(personId: string, dateStart: string, dateEnd: string) {
    return this.httpClient.get(
      this.urlPayroll + 'foliosNomina?personId=' + personId + '&fechaInicio=' + dateStart + '&fechaFin=' + dateEnd
    );
  }

  download(personId: string, consolidationId: string) {
    return this.httpClient.get(this.urlPayroll + 'descargaBase64?personId=' + personId + '&consolidationId=' + consolidationId);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PayrollService {

  constructor(
    private httpClient: HttpClient
  ) {}

  payroll() {
   return this.httpClient.get('https://siarhqamovil.cnh.gob.mx/api/recibo/foliosNomina?personId=283597&fechaInicio=01/01/2019&fechaFin=01/09/2019');
  }

}

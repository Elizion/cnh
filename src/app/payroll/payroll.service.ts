import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Payroll } from './payroll.model';

@Injectable({
  providedIn: 'root'
})
export class PayrollService {
  getApiVacations = 'https://siarhqamovil.cnh.gob.mx/api/recibo/foliosNomina?personId=283597&fechaInicio=01/01/2019&fechaFin=01/09/2019';
  constructor(private http: HttpClient) { }
  getPayroll() {
    return this.http.get<Payroll[]>(this.getApiVacations);
  }
}

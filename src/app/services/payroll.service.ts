import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PayrollModel } from '../payroll/payroll.model';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};
@Injectable({
 providedIn: 'root'
})
export class PayrollService {
 constructor(
  private httpClient: HttpClient
 ) {}
 getPayrolls(): Observable<PayrollModel[]> {
  return this.httpClient.get<PayrollModel[]>('https://jsonplaceholder.typicode.com/posts');
 }
}

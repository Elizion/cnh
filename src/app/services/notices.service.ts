import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
 providedIn: 'root'
})
export class GeneralService {
 constructor(
  private httpClient: HttpClient
 ) {}
 general() {
  return this.httpClient.get('https://siarhqamovil.cnh.gob.mx/api/avisos/general');
 }
}

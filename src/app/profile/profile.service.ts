import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private httpClient: HttpClient
  ) {}

  personal(personId: string) {
    return this.httpClient.get('https://siarhqamovil.cnh.gob.mx/api/avisos/empleado?personId=' + personId);
  }

}

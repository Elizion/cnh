import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
  getUser() {
    return this.http.get(`https://siarhqamovil.cnh.gob.mx/api/empleado/datos/283597`);
  }
}

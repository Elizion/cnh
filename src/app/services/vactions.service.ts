import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VacationsModel } from '../vacations/vacations.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
 providedIn: 'root'
})
export class VacationsService {
 constructor(
  private httpClient: HttpClient
 ) {}

 getVacations(): Observable<VacationsModel[]> {
  return this.httpClient.get<VacationsModel[]>('https://jsonplaceholder.typicode.com/posts');
 }

}

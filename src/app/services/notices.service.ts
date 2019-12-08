import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { NoticesModel } from '../notices/notices.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
 providedIn: 'root'
})
export class NoticesService {
 constructor(
  private httpClient: HttpClient
 ) {}

 getNotices(): Observable<NoticesModel[]> {
  return this.httpClient.get<NoticesModel[]>('https://jsonplaceholder.typicode.com/posts');
 }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { NoticesModel } from '../models/notices.model';
import { Constants as CONST } from '../config/config.const';
@Injectable({
 providedIn: 'root'
})
export class NoticesService {

  private urlVacations: string = CONST.PROTOCOL + CONST.HOST + CONST.BASE + CONST.MODULE[2];

  constructor( private httpClient: HttpClient ) {}

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Error: ' + error.error.message);
    } else {
      console.error('Body: ' + JSON.stringify(error.error));
    }
    return throwError('Something bad happened; please try again later.');
  }

  headers() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  CONST.X_WWW_FORM_URLENCODED,
      })
    };
    return httpOptions;
  }

  getNotices(): Observable<NoticesModel[]> {
    return this.httpClient.get<NoticesModel[]>('https://jsonplaceholder.typicode.com/posts');
  }

  notices(): Observable<NoticesModel[]> {
    return this.httpClient.get<NoticesModel[]>('https://jsonplaceholder.typicode.com/posts');
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Constants as CONST } from '../config/config.const';
@Injectable({
 providedIn: 'root'
})
export class GlobalService {

   request   = window.localStorage.getItem('user');
   response  = JSON.parse(this.request);

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

   getIdPerson() {
      const personId  = this.response.data.personId;
      return personId;
   }

   apiFake() {
      return this.httpClient.get('https://jsonplaceholder.typicode.com/posts').pipe(
         retry(CONST.ONE),
         catchError(this.handleError)
      );
   }

}

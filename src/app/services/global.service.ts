import { Injectable } from '@angular/core';
@Injectable({
 providedIn: 'root'
})
export class GlobalService {

   constructor() {}

   request   = window.localStorage.getItem('user');
   response  = JSON.parse(this.request);

   getIdPerson() {
      const personId  = this.response.data.personId;
      return personId;
   }
      
}

import { Injectable } from '@angular/core';
@Injectable({
 providedIn: 'root'
})
export class GlobalService {
 constructor() {}
 getIdPerson() {
    const request   = window.localStorage.getItem('user');
    const response  = JSON.parse(request);
    const personId  = response.data.personId;
    return personId;
 }
}

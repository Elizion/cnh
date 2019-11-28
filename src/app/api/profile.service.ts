import { Injectable } from '@angular/core';
import { Profile } from '../profile/profile.model';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private _profile: Profile[] = [
    new Profile(
      283597,
      'GARCIA PULIDO PEDRO',
      '439',
      'DIRECCION GENERAL DE RECURSOS HUMANOS',
      'SUBDIRECCIÓN DE ÁREA',
      '46-311-12201-N2002-39',
      'SUBDIRECCION DE NOMINA Y PRESTACIONES',
      'N22',
      'GAPP791213B35',
      '16/09/2016'
    )
  ];
  get profile() {
    return [...this._profile];
  }
  constructor() {}  
}
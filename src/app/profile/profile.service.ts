import { Injectable } from '@angular/core';
import { Profile } from './profile.model';
@Injectable({ providedIn: 'root' })
export class ProfileService {
  private _profile: Profile[] = [
      {
        personId: '283597',
        nombre: 'GARCIA PULIDO PEDRO',
        numeroEmpleado: '439',
        unidad: 'DIRECCION GENERAL DE RECURSOS HUMANOS',
        puesto: 'SUBDIRECCIÓN DE ÁREA',
        codigoPuesto: '46-311-12201-N2002-39',
        cargo: 'SUBDIRECCION DE NOMINA Y PRESTACIONES',
        nivel: 'N22',
        rfc: 'GAPP791213B35',
        fechaIngreso: '16/09/2016'
      }
  ];
  get profile() {
    return [...this._profile];
  }
}

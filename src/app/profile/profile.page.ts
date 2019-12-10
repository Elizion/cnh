import { Component, OnInit } from '@angular/core';
import { ProfileModel } from '../models/profile.model';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profile: ProfileModel = new ProfileModel();
  constructor() {}
  ngOnInit() {
    const request                       = window.localStorage.getItem('user');
    const response                      = JSON.parse(request);
    this.profile.personId               = response.data.personId;
    this.profile.nombre                 = response.data.nombre;
    this.profile.numeroEmpleado         = response.data.numeroEmpleado;
    this.profile.unidad                 = response.data.unidad;
    this.profile.puesto                 = response.data.puesto;
    this.profile.cargo                  = response.data.cargo;
    this.profile.nivel                  = response.data.nivel;
    this.profile.rfc                    = response.data.rfc;
    this.profile.fechaIngresoFormat     = response.data.fechaIngresoFormat;
    this.profile.fotoBase64             = response.data.fotoBase64;
  }
}


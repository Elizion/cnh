import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  personId: string;
  nombre: string;
  numeroEmpleado: string;
  unidad: string;
  puesto: string;
  cargo: string;
  nivel: string;
  rfc: string;
  fechaIngresoFormat: string;
  fotoBase64: string;
  constructor(
  ) { }
  ngOnInit() {
    const res = window.localStorage.getItem('user');
    const value = JSON.parse(res);
    this.personId = value.data.personId;
    this.nombre = value.data.nombre;
    this.numeroEmpleado = value.data.numeroEmpleado;
    this.unidad = value.data.unidad;
    this.puesto = value.data.puesto;
    this.cargo = value.data.cargo;
    this.nivel = value.data.nivel;
    this.rfc = value.data.rfc;
    this.fechaIngresoFormat = value.data.fechaIngresoFormat;
    this.fotoBase64 = value.data.fotoBase64;
  }
}

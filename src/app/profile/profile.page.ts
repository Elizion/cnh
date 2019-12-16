import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ProfileService } from '../services/profile.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(
    private loadingCtrl: LoadingController,
    private profileService: ProfileService
  ) {}

  isLoading = true;
  visible: any = false;
  personId: any;
  nombre: any;
  numeroEmpleado: any;
  unidad: any;
  puesto: any;
  cargo: any;
  nivel: any;
  rfc: any;
  fechaIngresoFormat: any;
  fotoBase64: any;

  ngOnInit() {
    this.profile();
  }

  profile(): void {
    this.isLoading = true;
    this.loadingCtrl
    .create({ keyboardClose: true, message: 'Cargando datos...' })
    .then(loadingEl => {
      loadingEl.present();
      this.profileService.profile().subscribe((res: Response) => {
        console.log(JSON.stringify(res));
        this.personId           = res['data'].personId;
        this.nombre             = res['data'].nombre;
        this.numeroEmpleado     = res['data'].numeroEmpleado;
        this.unidad             = res['data'].unidad;
        this.puesto             = res['data'].puesto;
        this.cargo              = res['data'].cargo;
        this.nivel              = res['data'].nivel;
        this.nivel              = res['data'].nivel;
        this.rfc                = res['data'].rfc;
        this.fechaIngresoFormat = res['data'].fechaIngresoFormat;
        this.fotoBase64         = res['data'].fotoBase64;
        this.visible            = true;
        this.isLoading          = false;
        loadingEl.dismiss();
      });
    });
  }

}


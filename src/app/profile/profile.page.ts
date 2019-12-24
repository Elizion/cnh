import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ProfileService } from '../services/profile.service';
import { GlobalService } from '../services/global.service';
import { UtilsMessage } from '../utils/utils.message';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(
    private loadingCtrl: LoadingController,
    private profileService: ProfileService,
    private globalService: GlobalService,
    private utilsMessage: UtilsMessage
  ) {}

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
  visible: any = false;

  ngOnInit() {
    this.profile();
  }

  profile(): void {
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
        window.localStorage.setItem('personId', JSON.stringify(res['data'].personId));
        loadingEl.dismiss();
      },
      (err) => {
        console.log(err);
        loadingEl.dismiss();
        this.utilsMessage.alertProfile();
        this.utilsMessage.routerNavigateAuth();
      });
    });
  }

}


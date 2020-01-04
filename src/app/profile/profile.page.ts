import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { LoadingController } from '@ionic/angular';
import { UtilsMessage } from '../utils/utils.message';
import { UtilsNavigate } from '../utils/utils.navigate';
import { UtilsHidden } from '../utils/utils.hidden';
import { Constants as CONST } from '../config/config.const';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  constructor(
    private profileService: ProfileService,
    private loadingCtrl: LoadingController,
    private utilsMessage: UtilsMessage,
    private utilsNavigate: UtilsNavigate,
    private utilsHidden: UtilsHidden
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
  visible: boolean;
  ngOnInit() {
    this.profileInit();
  }
  profileInit(): void {
    this.loadingCtrl
    .create({
      keyboardClose: true,
      spinner: null,
      message: CONST.LOADER_GIF
    })
    .then(loadingEl => {
      loadingEl.present();
      this.profileService.profile().subscribe((res: Response) => {
        const key = 'data';
        window.localStorage.setItem('personId', JSON.stringify(res[key].personId));
        this.personId           = res[key].personId;
        this.nombre             = res[key].nombre;
        this.numeroEmpleado     = res[key].numeroEmpleado;
        this.unidad             = res[key].unidad;
        this.puesto             = res[key].puesto;
        this.cargo              = res[key].cargo;
        this.nivel              = res[key].nivel;
        this.nivel              = res[key].nivel;
        this.rfc                = res[key].rfc;
        this.fechaIngresoFormat = res[key].fechaIngresoFormat;
        this.fotoBase64         = res[key].fotoBase64;
        this.visible = this.utilsHidden.visibleContent();
        loadingEl.dismiss();
      },
      (err) => {
        loadingEl.dismiss();
        this.utilsMessage.messageApiError(err, 'Profile', 'Información personal del usuario');
        this.utilsNavigate.routerNavigateAuth();
      });
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { LicensesService } from '../services/licenses.service';
import { GlobalService } from '../services/global.service';
import { UtilsMessage } from '../utils/utils.message';
import { UtilsNavigate } from '../utils/utils.navigate';
import { UtilsHidden } from '../utils/utils.hidden';
import { Constants as CONST } from '../config/config.const';
@Component({
  selector: 'app-licenses',
  templateUrl: './licenses.page.html',
  styleUrls: ['./licenses.page.scss'],
})
export class LicensesPage implements OnInit {

  idPerson = this.globalService.personId();
  licensesArray: any = [];
  visible: boolean;

  constructor(
    private loadingCtrl: LoadingController,
    private licenseService: LicensesService,
    private globalService: GlobalService,
    private utilsMessage: UtilsMessage,
    private utilsNavigate: UtilsNavigate,
    private utilsHidden: UtilsHidden
  ) { }

  ngOnInit() {
    this.licensesInit();
  }

  licensesInit(): void {
    this.loadingCtrl
    .create({
      keyboardClose: true,
      spinner: null,
      message: CONST.LOADER_GIF,
      cssClass: 'custom-loader-class'
    })
    .then(loadingEl => {

      loadingEl.present();

      this.licenseService.licenses(/*this.idPerson*/283625).subscribe((res: Response ) => {
        const key = 'data';
        this.licensesArray = res[key];
        console.log(this.licensesArray);
        this.visible = this.utilsHidden.visibleContent();
        loadingEl.dismiss();
      },

      (err) => {
        loadingEl.dismiss();
        this.utilsMessage.messageApiError(err, 'Licencias', 'Error');
        this.utilsNavigate.routerNavigatePayroll();
      });

    });
  }

}

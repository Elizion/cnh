import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { NoticesService } from '../../services/notices.service';
import { GlobalService } from '../../services/global.service';
import { UtilsMessage } from '../../utils/utils.message';
import { UtilsNavigate } from '../../utils/utils.navigate';
import { UtilsHidden } from '../../utils/utils.hidden';
import { Constants as CONST } from '../../config/config.const';
@Component({
  selector: 'app-personal',
  templateUrl: './personal.page.html',
  styleUrls: ['./personal.page.scss'],
})
export class PersonalPage {
  constructor(
    private loadingCtrl: LoadingController,
    private noticesService: NoticesService,
    private globalService: GlobalService,
    private utilsMessage: UtilsMessage,
    private utilsNavigate: UtilsNavigate,
    private utilsHidden: UtilsHidden
  ) {}
  isLoading = false;
  isLogin = true;
  listPersonal: any[];
  idPerson = this.globalService.personId();
  visible: any = false;
  card: any = true;
  ionViewWillEnter() {
    this.personalInit();
  }
  personalInit(): void {
    this.loadingCtrl
    .create({
      keyboardClose: true,
      spinner: null,
      message: CONST.LOADER_GIF,
      cssClass: 'custom-loader-class'
    })
    .then(loadingEl => {
      loadingEl.present();
      this.noticesService.personal(this.idPerson).subscribe( (res: Response ) => {
        const key = 'data';
        this.listPersonal = res[key];
        this.visible = this.utilsHidden.visibleContent();
        loadingEl.dismiss();
        this.isVisible();
      },
      (err) => {
        this.utilsMessage.messageApiError(err, 'Avisos individuales', 'Error');
        this.utilsNavigate.routerNavigateNotices();
        loadingEl.dismiss();
      });
    });
  }
  isVisible() {
    if (this.listPersonal.length === 0) {
      this.card = false;
    } else {
      this.card = true;
    }
  }
}

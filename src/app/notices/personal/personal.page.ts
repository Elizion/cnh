import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { NoticesService } from '../../services/notices.service';
import { GlobalService } from '../../services/global.service';
import { UtilsMessage } from '../../utils/utils.message';
import { UtilsNavigate } from '../../utils/utils.navigate';
import { UtilsHidden } from '../../utils/utils.hidden';
@Component({
  selector: 'app-personal',
  templateUrl: './personal.page.html',
  styleUrls: ['./personal.page.scss'],
})
export class PersonalPage implements OnInit {
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
  ngOnInit() {
    this.personalInit();
  }
  personalInit(): void {
    this.loadingCtrl
    .create({ keyboardClose: true, message: this.utilsMessage.messageCharging() })
    .then(loadingEl => {
      loadingEl.present();
      this.noticesService.personal(this.idPerson).subscribe( (res: Response ) => {
        const key = 'data';
        this.listPersonal = res[key];
        this.visible = this.utilsHidden.visibleContent();
        loadingEl.dismiss();
      },
      (err) => {
        this.utilsMessage.messageApiError(err, 'Avisos individuales', 'Error');
        this.utilsNavigate.routerNavigateNotices();
        loadingEl.dismiss();
      });
    });
  }
}

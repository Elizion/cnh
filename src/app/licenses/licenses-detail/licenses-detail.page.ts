import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../services/global.service';
import { LoadingController } from '@ionic/angular';
import { LicensesService } from '../../services/licenses.service';
import { UtilsMessage } from '../../utils/utils.message';
import { UtilsNavigate } from '../../utils/utils.navigate';
import { UtilsHidden } from '../../utils/utils.hidden';
import { Constants as CONST } from '../../config/config.const';
@Component({
  selector: 'app-licenses-detail',
  templateUrl: './licenses-detail.page.html',
  styleUrls: ['./licenses-detail.page.scss'],
})
export class LicensesDetailPage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private globalService: GlobalService,
    private loadingCtrl: LoadingController,
    private licenseService: LicensesService,
    private utilsMessage: UtilsMessage,
    private utilsNavigate: UtilsNavigate,
    private utilsHidden: UtilsHidden
  ) { }

  idPerson = this.globalService.personId();
  historicalArray: any = [];
  id: string;
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('daysWithPay');
    console.log(this.id + ' ' + this.idPerson);
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
      this.licenseService.historical(/*this.idPerson*/'283625', this.id).subscribe((res: Response ) => {
        const key = 'data';
        this.historicalArray = res[key];
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

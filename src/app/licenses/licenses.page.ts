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
  constructor(
    private loadingCtrl: LoadingController,
    private licenseService: LicensesService,
    private globalService: GlobalService,
    private utilsMessage: UtilsMessage,
    private utilsNavigate: UtilsNavigate,
    private utilsHidden: UtilsHidden
  ) { }

  idPerson = this.globalService.personId();
  idAnniversaryYear: any;

  historicalArray: any = [];
  licensesArray: any = [];

  anniversaryYear: any;
  daysWithPay: any;
  qtyDaysWithPay: any;
  daysWithHalfPay: any;
  qtyDaysWithHalfPay: any;
  qtyDaysWithoutPay: any;
  maternity: any;
  qtyMaternity: any;

  visibleContent: any = false;
  cardNotFound: any = true;

  ngOnInit() {
    this.licensesInit();
  }

  setIdAnniversaryYear() {
    this.idAnniversaryYear = this.anniversaryYear;
  }

  loadFirstElement(): void {
    if (this.licensesArray != null && this.licensesArray.length > 0 ) {
      this.anniversaryYear = this.licensesArray[0].anniversaryYear;
      this.daysWithPay = this.licensesArray[0].daysWithPay;
      this.qtyDaysWithPay = this.licensesArray[0].qtyDaysWithPay;
      this.daysWithHalfPay = this.licensesArray[0].daysWithHalfPay;
      this.qtyDaysWithHalfPay = this.licensesArray[0].qtyDaysWithHalfPay;
      this.qtyDaysWithoutPay = this.licensesArray[0].qtyDaysWithoutPay;
      this.maternity = this.licensesArray[0].maternity;
      this.qtyMaternity = this.licensesArray[0].qtyMaternity;
      this.visibleContent = this.utilsHidden.visibleContent();
      this.setIdAnniversaryYear();
    }
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
      this.licenseService.licenses(this.idPerson).subscribe((res: Response ) => {
        const key = 'data';
        this.licensesArray = res[key];
        this.loadFirstElement();
        this.licensesInitSescond();
        this.cardNotFound = this.globalService.isVisible(this.licensesArray);
        loadingEl.dismiss();
      },
      (err) => {
        loadingEl.dismiss();
        this.utilsMessage.messageApiError(err, 'Licencias', 'Error');
        this.utilsNavigate.routerNavigatePayroll();
      });
    });
  }

  licensesInitSescond(): void {
    this.loadingCtrl
    .create({
      keyboardClose: true,
      spinner: null,
      message: CONST.LOADER_GIF,
      cssClass: 'custom-loader-class'
    })
    .then(loadingEl => {
      loadingEl.present();
      this.licenseService.historical(this.idPerson, this.idAnniversaryYear).subscribe((res: Response ) => {
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

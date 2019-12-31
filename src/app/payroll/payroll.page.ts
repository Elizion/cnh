import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { IonItemSliding } from '@ionic/angular';
import { PayrollService } from '../services/payroll.service';
import { GlobalService } from '../services/global.service';
import { UtilsMessage } from '../utils/utils.message';
import { UtilsNavigate } from '../utils/utils.navigate';
import { UtilsHidden } from '../utils/utils.hidden';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import { Constants as CONST } from '../config/config.const';
@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.page.html',
  styleUrls: ['./payroll.page.scss'],
})
export class PayrollPage implements OnInit {

  constructor(
    private loadingCtrl: LoadingController,
    private payrollService: PayrollService,
    private globalService: GlobalService,
    private utilsMessage: UtilsMessage,
    private utilsNavigate: UtilsNavigate,
    private utilsHidden: UtilsHidden
  ) { }

  isLoading = false;
  isLogin = true;
  payrollArray: any[];
  b64Data: string;
  idPerson = this.globalService.personId();
  visible: boolean;

  ngOnInit() {
    this.payrollInit();
  }

  payrollInit(): void {
    this.loadingCtrl
    .create({ keyboardClose: true, message: this.utilsMessage.messageCharging() })
    .then(loadingEl => {
      loadingEl.present();
      this.payrollService.payroll(this.idPerson, '', '').subscribe( (res: Response ) => {
        const key = 'data';
        this.payrollArray = res[key];
        this.visible = this.utilsHidden.visibleContent();
        loadingEl.dismiss();
      },
      (err) => {
        loadingEl.dismiss();
        this.utilsMessage.messageApiError(err, 'PayrollPage', 'payrollInit()');
        this.utilsNavigate.routerNavigatePayroll();
      });
    });
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const startDate = moment(form.value.started).format('DD/MM/YYYY');
    const endDate = moment(form.value.finished).format('DD/MM/YYYY');
    this.loadingCtrl
    .create({ keyboardClose: true, message: this.utilsMessage.messageCharging() })
    .then(loadingEl => {
      loadingEl.present();
      this.payrollService.payroll(
        this.idPerson,
        startDate,
        endDate
      ).subscribe( (res: Response ) => {
        const key = 'data';
        this.payrollArray = res[key];
        loadingEl.dismiss();
      },
      (err) => {
        this.utilsMessage.messageApiError(err, 'PayrollPage', 'onSubmit()');
        this.utilsNavigate.routerNavigatePayroll();
        loadingEl.dismiss();
      });
    });
  }

  impress(id: string): void {
    this.loadingCtrl
    .create({ keyboardClose: true, message: this.utilsMessage.messageDownloading() })
    .then(loadingEl => {
      loadingEl.present();
      this.payrollService.download(this.idPerson, id).subscribe( (res: Response ) => {
        const key = 'data';
        this.b64Data = res[key].archivoBase64;
        const nameFile = res[key].nombreArchivo;
        this.download(this.b64Data, nameFile);
        loadingEl.dismiss();
      },
      (err) => {
        loadingEl.dismiss();
        this.utilsMessage.messageApiError(err, 'PayrollPage', 'impress()');
        this.utilsNavigate.routerNavigatePayroll();
      });
    });
  }

  download(b64Data: string, nameFile: string): void {
    this.globalService.b64toBlobPdf(b64Data, nameFile,  CONST.APPLICATION_PDF, CONST.SIZE_BUFFER);
  }

}

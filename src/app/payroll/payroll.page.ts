import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { IonItemSliding } from '@ionic/angular';
import { PayrollService } from '../services/payroll.service';
import { GlobalService } from '../services/global.service';
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
    private globalService: GlobalService
  ) { }

  isLoading = false;
  isLogin = true;
  payrollArray: any[];
  b64Data: string;
  idPerson = this.globalService.personId();
  visible: any = false;

  ngOnInit() {
    this.payroll();
  }

  payroll(): void {
    this.isLoading = true;
    this.loadingCtrl
    .create({ keyboardClose: true, message: 'Cargando datos...' })
    .then(loadingEl => {
      loadingEl.present();
      this.payrollService.payroll(this.idPerson, '', '').subscribe( (res: Response ) => {
        this.payrollArray = res['data'];
        console.log(this.payrollArray);
        this.visible = true;
        this.isLoading = false;
        loadingEl.dismiss();
      },
      (err) => {
        console.log(err);
        loadingEl.dismiss();
        this.globalService.alertPayroll();
        this.globalService.routerNavigatePayroll();
      });
    });
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const startDate = moment(form.value.started).format('DD/MM/YYYY');
    const endDate = moment(form.value.finished).format('DD/MM/YYYY');
    console.log(startDate + ' ' + endDate);
    this.isLoading = true;
    this.loadingCtrl
    .create({ keyboardClose: true, message: 'Agregando fechas...' })
    .then(loadingEl => {
      loadingEl.present();
      this.payrollService.payroll(
        this.idPerson,
        startDate,
        endDate
      ).subscribe( (res: {} ) => {
        console.log(JSON.stringify(res['data']));
        this.payrollArray = res['data'];
        this.isLoading        = false;
        loadingEl.dismiss();
      });
    });
  }

  impress(id: string, slidingEl: IonItemSliding): void {
    console.log(id);
    this.isLoading = true;
    this.loadingCtrl
    .create({ keyboardClose: true, message: 'Descargando solicitud...' })
    .then(loadingEl => {
      loadingEl.present();
      this.payrollService.download(this.idPerson, id).subscribe( (res: Response ) => {
        this.b64Data = res['data'].archivoBase64;
        const nameFile = res['data'].nombreArchivo;
        this.download(this.b64Data, nameFile);
        console.log(this.payrollArray);
        this.isLoading = false;
        loadingEl.dismiss();
      },
      (err) => {
        console.log(err);
        loadingEl.dismiss();
        this.globalService.alertAddDate();
        this.globalService.routerNavigatePayroll();
      });
    });
  }

  download(b64Data: string, nameFile: string): void {
    this.globalService.b64toBlob(b64Data, nameFile,  CONST.APPLICATION_PDF, CONST.SIZE_BUFFER);
  }

}

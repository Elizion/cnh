import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { IonItemSliding } from '@ionic/angular';
import { PayrollService } from '../services/payroll.service';
import { GlobalService } from '../services/global.service';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
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
    private platform: Platform,
    private file: File,
    private fileOpener: FileOpener
  ) { }

  isLoading = false;
  isLogin = true;
  payrollArray: any[];
  b64Data: string;
  idPerson = this.globalService.getIdPerson();
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
      this.payrollService.payroll(this.idPerson, '', '').subscribe( (res: {} ) => {
        this.payrollArray = res['data'];
        console.log(this.payrollArray);
        this.visible = true;
        this.isLoading = false;
        loadingEl.dismiss();
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

  /*
  open() {
    const request: DownloadRequest = {
      uri: 'https://devdactic.com/html/5-simple-hacks-LBT.pdf',
      title: 'vacaciones',
      description: '',
      mimeType: '',
      visibleInDownloadsUi: true,
      notificationVisibility: NotificationVisibility.VisibleNotifyCompleted,
      destinationInExternalFilesDir: {
        dirType: 'Downloads',
        subPath: 'app-debug.apk'
      }
    };
    this.downloader.download(request)
    .then((location: string) => console.log('File downloaded at:' + location))
    .catch((error: any) => console.error(error));
  }
  */

  download(id: string, slidingEl: IonItemSliding): void {
    console.log(id);
    this.payrollService.download(this.idPerson, id).subscribe( (res: {} ) => {
      this.b64Data = res['data'].archivoBase64;
      const nameFile = res['data'].nombreArchivo;
      this.globalService.b64toBlob(this.b64Data, nameFile,  CONST.APPLICATION_PDF, CONST.SIZE_BUFFER);
      console.log(this.payrollArray);
    });
  }

}

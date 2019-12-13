import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Downloader, NotificationVisibility, DownloadRequest } from '@ionic-native/downloader/ngx';
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
    private downloader: Downloader,
    private platform: Platform,
    private file: File,
    private fileOpener: FileOpener
  ) { }

  isLoading = false;
  isLogin = true;
  payrollArray: any[];
  b64Data: string;
  idPerson = this.globalService.getIdPerson();

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
      this.b64toBlob(this.b64Data, nameFile,  CONST.APPLICATION_PDF, CONST.SIZE_BUFFER);
      console.log(this.payrollArray);
    });
  }

  b64toBlob(b64Data: string, nameFile: string, contentType: string, sliceSize: number): void {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type: contentType });
    const fileName = nameFile;
    const filePath = (this.platform.is('android')) ? this.file.externalRootDirectory : this.file.cacheDirectory;
    this.file.writeFile(filePath, fileName, blob, { replace: true }).then((fileEntry) => {
      this.fileOpener.open(fileEntry.toURL(), CONST.APPLICATION_PDF)
        .then(() => console.log('File is opened'))
        .catch(err => console.error('Error openening file: ' + err));
    })
    .catch((err) => {
      console.error('Error creating file: ' + err);
      throw err;
    });
  }

}

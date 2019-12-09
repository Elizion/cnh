import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { IonItemSliding } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Downloader, NotificationVisibility, DownloadRequest } from '@ionic-native/downloader/ngx';
import { PayrollModel } from '../models/payroll.model';
import { PayrollService } from '../services/payroll.service';
@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.page.html',
  styleUrls: ['./payroll.page.scss'],
})
export class PayrollPage implements OnInit {

  isLoading = false;
  isLogin = true;
  payrolls: PayrollModel[];

  constructor(
    private loadingCtrl: LoadingController,
    private payrollService: PayrollService,
    private platform: Platform,
    private file: File,
    private fileOpener: FileOpener,
    private downloader: Downloader
  ) { }

  ngOnInit() {

    this.isLoading = true;
    this.loadingCtrl
    .create({ keyboardClose: true, message: 'Cargando api fake...' })
    .then(loadingEl => {
      loadingEl.present();
      this.getPayrolls();
      this.isLoading = false;
      loadingEl.dismiss();
    });

  }

  downloadPdf(slidingEl: IonItemSliding) {
    const request: DownloadRequest = {
      uri: 'https://devdactic.com/html/5-simple-hacks-LBT.pdf',
      title: 'Recibo',
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
    slidingEl.close();
  }

  getPayrolls(): void {
    this.payrollService.getPayrolls().subscribe(payrolls => this.payrolls = payrolls);
  }

  count() {
    alert(this.payrolls.length);
  }

  restart() {
    this.getPayrolls();
  }

  removeItem(id: number, slidingEl: IonItemSliding) {
    let i = 0;
    for ( i; i < this.payrolls.length; i++ ) {
      if (this.payrolls[i].id === id) {
        console.log(id);
        this.payrolls.splice(i, 1);
        console.log(JSON.stringify(this.payrolls));
      }
    }
    slidingEl.close();
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const started = form.value.started;
    const finished = form.value.finished;
    alert(started + ' ' + finished);
  }

}
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { PayrollService } from './payroll.service';
import { Downloader, NotificationVisibility, DownloadRequest } from '@ionic-native/downloader/ngx';
@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.page.html',
  styleUrls: ['./payroll.page.scss'],
})
export class PayrollPage implements OnInit {
  
  isLoading = false;
  payrolls: any[] = [];
  
  constructor(
    private loadingCtrl: LoadingController,
    private payrollService: PayrollService,
    private downloader: Downloader
  ) { }

  myFunction() {
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
    .then((location: string) => console.log('File downloaded at:'+location))
    .catch((error: any) => console.error(error));
  }

  ngOnInit() {
    this.isLoading = true;
    this.loadingCtrl
    .create({ keyboardClose: true, message: 'Cargando recibos...' })
    .then(loadingEl => {
      loadingEl.present();
      this.payrollService.payroll().subscribe((res) => {
        this.payrolls = res['data'];
        this.isLoading = false;
        loadingEl.dismiss();
      });
    });
  }
}


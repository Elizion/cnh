import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Downloader, NotificationVisibility, DownloadRequest } from '@ionic-native/downloader/ngx';
import { IonItemSliding } from '@ionic/angular';
import { PayrollService } from '../services/payroll.service';
import { GlobalService } from '../services/global.service';
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
    private downloader: Downloader
  ) { }

  isLoading = false;
  isLogin = true;
  payrollArray: any[];
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
      this.payrollService.payroll(this.idPerson).subscribe( (res: {} ) => {
        
        this.payrollArray = res['data'];

        console.log(this.payrollArray);
        this.isLoading = false;
        loadingEl.dismiss();
      });
    });
  }

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

  download(id: number, slidingEl: IonItemSliding): void {
    console.log(id);
    this.open();
    slidingEl.close();
  }

}

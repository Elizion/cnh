/*
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/file/ngx';
*/
import { Component, OnInit } from '@angular/core';
import { PayrollService } from './payroll.service';
import { LoadingController } from '@ionic/angular';
import { Payroll } from './payroll.model';
@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.page.html',
  styleUrls: ['./payroll.page.scss'],
})
export class PayrollPage implements OnInit {
  isLoading = false;
  _payroll: Payroll[];
  constructor(
    private payrollService: PayrollService,
    private loadingCtrl: LoadingController,
  ) {}
  ngOnInit() {
    this.isLoading = true;
    this.loadingCtrl
    .create({ keyboardClose: true, message: 'Cargando...' })
    .then(loadingEl => {
      loadingEl.present();
      return this.payrollService.getPayroll().subscribe((response) => {
        this._payroll = response['data'];
        this.isLoading = false;
        loadingEl.dismiss();
      });
    });
  }
  download() {
    /*
    const fileTransfer: FileTransferObject = this.fileTransfer.create();
    const url = 'https://devdactic.com/html/5-simple-hacks-LBT.pdf';
    fileTransfer.download(url, this.file.externalRootDirectory  + 'file.pdf').then((entry) => {
        alert('Download complete: ' + entry.toURL());
      }, (error) => {
        alert('ERROR: ' + error);
    });
    */
  }
}
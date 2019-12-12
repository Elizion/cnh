import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { IonItemSliding } from '@ionic/angular';
import { NoticesService } from '../../services/notices.service';
import { GlobalService } from '../../services/global.service';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Constants as CONST } from '../../config/config.const';
@Component({
  selector: 'app-personal',
  templateUrl: './personal.page.html',
  styleUrls: ['./personal.page.scss'],
})
export class PersonalPage implements OnInit {

  constructor(
    private loadingCtrl: LoadingController,
    private noticesService: NoticesService,
    private globalService: GlobalService,
    private platform: Platform,
    private file: File,
    private fileOpener: FileOpener
  ) {}

  isLoading = false;
  isLogin = true;
  listPersonal: any[];
  base: any;
  idPerson = this.globalService.getIdPerson();

  ngOnInit() {
    this.personal();
  }

  personal(): void {
    this.isLoading = true;
    this.loadingCtrl
    .create({ keyboardClose: true, message: 'Cargando datos...' })
    .then(loadingEl => {
      loadingEl.present();
      this.noticesService.personal(this.idPerson).subscribe( (res: {} ) => {
        this.listPersonal = res['data'];
        console.log(JSON.stringify(this.listPersonal));
        this.isLoading = false;
        loadingEl.dismiss();
      });
    });
  }

  download(id: string): void {
    this.noticesService.download(id).subscribe( (res: {} ) => {
      this.base = res['data'];
      console.log(JSON.stringify(this.base));
      this.b64toBlob(this.base, CONST.APPLICATION_XLSX, 512);
    });
  }

  show(id: string, slidingEl: IonItemSliding): void {
    this.download(id);
    slidingEl.close();
  }

  b64toBlob(b64Data: string, contentType: string, sliceSize: number): void {
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
    const fileName = 'file_excel';
    const filePath = (this.platform.is('android')) ? this.file.externalRootDirectory : this.file.cacheDirectory;
    this.file.writeFile(filePath, fileName, blob, { replace: true }).then((fileEntry) => {
      this.fileOpener.open(fileEntry.toURL(), CONST.APPLICATION_XLSX)
        .then(() => console.log('File is opened'))
        .catch(err => console.error('Error openening file: ' + err));
    })
    .catch((err) => {
      console.error('Error creating file: ' + err);
      throw err;
    });
  }

}

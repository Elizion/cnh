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
  idPerson = this.globalService.personId();
  visible: any = false;
  ngOnInit() {
    this.personal();
  }
  personal(): void {
    this.isLoading = true;
    this.loadingCtrl
    .create({ keyboardClose: true, message: 'Cargando datos...' })
    .then(loadingEl => {
      loadingEl.present();
      this.noticesService.personal(this.idPerson).subscribe( (res: Response ) => {
        this.listPersonal = res['data'];
        console.log(JSON.stringify(this.listPersonal));
        this.visible = true;
        this.isLoading = false;
        loadingEl.dismiss();
      },
      (err) => {
        console.log(err);
        loadingEl.dismiss();
        this.globalService.alertPersonal();
        this.globalService.routerNavigateNotices();
      });
    });
  }

  download(id: string, extension: string): void {

    this.noticesService.download(id).subscribe( (res: {} ) => {

      this.base = res['data'];

      if (extension === 'pdf') {
        this.b64toBlob(this.base, CONST.APPLICATION_PDF, CONST.SIZE_BUFFER);
      }
      if (extension === 'xls') {
        this.b64toBlob(this.base, CONST.APPLICATION_XLS, CONST.SIZE_BUFFER);
      }
      if (extension === 'xlsx') {
        this.b64toBlob(this.base, CONST.APPLICATION_XLSX, CONST.SIZE_BUFFER);
      }
      if (extension === 'doc') {
        this.b64toBlob(this.base, CONST.APPLICATION_DOC, CONST.SIZE_BUFFER);
      }
      if (extension === 'docx') {
        this.b64toBlob(this.base, CONST.APPLICATION_DOCX, CONST.SIZE_BUFFER);
      }
      if (extension === 'jpg') {
        this.b64toBlob(this.base, CONST.APPLICATION_JPG, CONST.SIZE_BUFFER);
      }
      if (extension === 'jpeg') {
        this.b64toBlob(this.base, CONST.APPLICATION_JPEG, CONST.SIZE_BUFFER);
      }
      if (extension === 'png') {
        this.b64toBlob(this.base, CONST.APPLICATION_PNG, CONST.SIZE_BUFFER);
      }
      if (extension === 'txt') {
        this.b64toBlob(this.base, CONST.APPLICATION_TXT, CONST.SIZE_BUFFER);
      }

    });

  }

  getFileExtension(nameFile) {
    const ext = /^.+\.([^.]+)$/.exec(nameFile);
    return ext == null ? '' : ext[1];
  }

  show(id: string, nameFile: string, slidingEl: IonItemSliding): void {
    const ext = this.getFileExtension(nameFile);
    console.log(nameFile);
    console.log(ext);
    this.download(id, ext);
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

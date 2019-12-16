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
  nameFile: any;

  ngOnInit() {
    this.personal();
  }

  personal(): void {
    this.loadingCtrl
    .create({ keyboardClose: true, message: 'Cargando datos...' })
    .then(loadingEl => {
      loadingEl.present();
      this.noticesService.personal(this.idPerson).subscribe( (res: Response ) => {
        this.listPersonal = res['data'];
        console.log(JSON.stringify(this.listPersonal));
        this.visible = true;
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
    this.loadingCtrl
    .create({ keyboardClose: true, message: 'Guardando fechas...' })
    .then(loadingEl => {
      loadingEl.present();
      this.noticesService.download(id).subscribe( (res: {} ) => {
        this.base = res['data'];
        this.nameFile = res['data'].nombreArchivo;
        if (extension === 'pdf') {
          this.globalService.b64toBlob(this.base, this.nameFile, CONST.APPLICATION_PDF, CONST.SIZE_BUFFER);
        }
        if (extension === 'xls') {
          this.globalService.b64toBlob(this.base, this.nameFile, CONST.APPLICATION_XLS, CONST.SIZE_BUFFER);
        }
        if (extension === 'xlsx') {
          this.globalService.b64toBlob(this.base, this.nameFile, CONST.APPLICATION_XLSX, CONST.SIZE_BUFFER);
        }
        if (extension === 'doc') {
          this.globalService.b64toBlob(this.base, this.nameFile, CONST.APPLICATION_DOC, CONST.SIZE_BUFFER);
        }
        if (extension === 'docx') {
          this.globalService.b64toBlob(this.base, this.nameFile, CONST.APPLICATION_DOCX, CONST.SIZE_BUFFER);
        }
        if (extension === 'jpg') {
          this.globalService.b64toBlob(this.base, this.nameFile, CONST.APPLICATION_JPG, CONST.SIZE_BUFFER);
        }
        if (extension === 'jpeg') {
          this.globalService.b64toBlob(this.base, this.nameFile, CONST.APPLICATION_JPEG, CONST.SIZE_BUFFER);
        }
        if (extension === 'png') {
          this.globalService.b64toBlob(this.base, this.nameFile, CONST.APPLICATION_PNG, CONST.SIZE_BUFFER);
        }
        if (extension === 'txt') {
          this.globalService.b64toBlob(this.base, this.nameFile, CONST.APPLICATION_TXT, CONST.SIZE_BUFFER);
        }
      },
      (err) => {
        console.log(err);
        loadingEl.dismiss();
        this.globalService.alertImpressPersonal();
        this.globalService.routerNavigateNotices();
      });
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

}

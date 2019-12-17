import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { IonItemSliding } from '@ionic/angular';
import { NoticesService } from '../../services/notices.service';
import { GlobalService } from '../../services/global.service';
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
    private globalService: GlobalService
  ) {}

  isLoading = false;
  isLogin = true;
  listPersonal: any[];
  base64: any;
  idPerson = this.globalService.personId();
  visible: any = false;

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

  download(id: string, nameFile: string): void {

    const extension = this.getFileExtension(nameFile);

    console.log(nameFile);
    console.log(extension);

    this.loadingCtrl
    .create({ keyboardClose: true, message: 'Decargando ' + nameFile })
    .then(loadingEl => {

      loadingEl.present();

      this.noticesService.download(id).subscribe( (res: Response ) => {

        this.base64 = res['data'];

        if (extension === 'pdf') {
          this.globalService.b64toBlob(this.base64, nameFile, CONST.APPLICATION_PDF, CONST.SIZE_BUFFER);
        }
        if (extension === 'docx') {
          this.globalService.b64toBlobDoc(this.base64, nameFile, CONST.APPLICATION_DOCX, CONST.SIZE_BUFFER);
        }

        /*
        if (extension === 'xls') {
          this.globalService.b64toBlob(this.base64, this.nameFile, CONST.APPLICATION_XLS, CONST.SIZE_BUFFER);
        }
        if (extension === 'xlsx') {
          this.globalService.b64toBlob(this.base64, this.nameFile, CONST.APPLICATION_XLSX, CONST.SIZE_BUFFER);
        }
        if (extension === 'doc') {
          this.globalService.b64toBlob(this.base64, this.nameFile, CONST.APPLICATION_DOC, CONST.SIZE_BUFFER);
        }
        if (extension === 'docx') {
          this.globalService.b64toBlob(this.base64, this.nameFile, CONST.APPLICATION_DOCX, CONST.SIZE_BUFFER);
        }
        if (extension === 'jpg') {
          this.globalService.b64toBlob(this.base64, this.nameFile, CONST.APPLICATION_JPG, CONST.SIZE_BUFFER);
        }
        if (extension === 'jpeg') {
          this.globalService.b64toBlob(this.base64, this.nameFile, CONST.APPLICATION_JPEG, CONST.SIZE_BUFFER);
        }
        if (extension === 'png') {
          this.globalService.b64toBlob(this.base64, this.nameFile, CONST.APPLICATION_PNG, CONST.SIZE_BUFFER);
        }
        if (extension === 'txt') {
          this.globalService.b64toBlob(this.base64, this.nameFile, CONST.APPLICATION_TXT, CONST.SIZE_BUFFER);
        }*/
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
    this.download(id, nameFile);
    slidingEl.close();
  }

}

import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { IonItemSliding } from '@ionic/angular';
import { NoticesService } from '../../services/notices.service';
import { GlobalService } from '../../services/global.service';
import { UtilsMessage } from '../../utils/utils.message';
import { UtilsNavigate } from '../../utils/utils.navigate';
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
    private utilsMessage: UtilsMessage,
    private utilsNavigate: UtilsNavigate
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
        this.utilsMessage.alertPersonal();
        this.utilsNavigate.routerNavigateNotices();
      });
    });
  }

  getFileExtension(nameFile: string) {
    const ext = /^.+\.([^.]+)$/.exec(nameFile);
    return ext == null ? '' : ext[1];
  }

  download(id: string, nameFile: string, slidingEl: IonItemSliding): void {
    const extension = this.getFileExtension(nameFile);
    console.log(nameFile);
    console.log(extension);
    this.loadingCtrl
    .create({ keyboardClose: true, message: 'Procesando archivo...' })
    .then(loadingEl => {
      loadingEl.present();
      this.noticesService.download(id).subscribe( (res: Response ) => {
        this.base64 = res['data'];
        switch (extension) {
          case 'pdf':
            this.globalService.b64toBlobPdf(this.base64, nameFile, CONST.APPLICATION_PDF, CONST.SIZE_BUFFER);
            break;
          case 'docx':
            this.globalService.b64toBlobDocx(this.base64, nameFile, CONST.APPLICATION_DOCX, CONST.SIZE_BUFFER);
            break;
          case 'txt':
            this.globalService.b64toBlobTxt(this.base64, nameFile, CONST.APPLICATION_TXT, CONST.SIZE_BUFFER);
            break;
          case 'xlsx':
            this.globalService.b64toBlobXlsx(this.base64, nameFile, CONST.APPLICATION_XLSX, CONST.SIZE_BUFFER);
            break;
          case 'jpg':
            this.globalService.b64toBlobJpg(this.base64, nameFile, CONST.APPLICATION_JPG, CONST.SIZE_BUFFER);
            break;
          default:
            this.utilsMessage.alertExtensionNotAvaible();
        }
        slidingEl.close();
        loadingEl.dismiss();
      },
      (err) => {
        console.log(err);
        slidingEl.close();
        loadingEl.dismiss();
        this.utilsMessage.alertImpressPersonal();
        this.utilsNavigate.routerNavigateNotices();
      });
    });
  }

}

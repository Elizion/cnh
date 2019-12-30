import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { NoticesService } from '../../../services/notices.service';
import { GlobalService } from '../../../services/global.service';
import { UtilsMessage } from '../../../utils/utils.message';
import { UtilsNavigate } from '../../../utils/utils.navigate';
import { Constants as CONST } from '../../../config/config.const';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-personal-detail',
  templateUrl: './personal-detail.page.html',
  styleUrls: ['./personal-detail.page.scss'],
})
export class PersonalDetailPage implements OnInit {

  id: any;
  nombreArchivo: any;
  mensaje: any;

  constructor(
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private noticesService: NoticesService,
    private globalService: GlobalService,
    private utilsMessage: UtilsMessage,
    private utilsNavigate: UtilsNavigate,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('noticeId');
    const nombreArchivo = this.route.snapshot.paramMap.get('nombreArchivo');
    const mensaje = this.route.snapshot.paramMap.get('mensaje');
    this.id = id;
    this.nombreArchivo = nombreArchivo;
    this.mensaje = mensaje;
  }

  getFileExtension(nameFile: string) {
    const ext = /^.+\.([^.]+)$/.exec(nameFile);
    return ext == null ? '' : ext[1];
  }

  download(id: string, nameFile: string): void {
    id = this.id;
    nameFile = this.nombreArchivo;
    const extension = this.getFileExtension(nameFile);
    this.loadingCtrl
    .create({ keyboardClose: true, message: this.utilsMessage.messageDownloading() })
    .then(loadingEl => {
      loadingEl.present();
      this.noticesService.download(id).subscribe( (res: Response ) => {
        const key = 'data';
        const base64 = res[key];
        switch (extension) {
          case 'pdf':
            this.globalService.b64toBlobPdf(base64, nameFile, CONST.APPLICATION_PDF, CONST.SIZE_BUFFER);
            break;
          case 'docx':
            this.globalService.b64toBlobDocx(base64, nameFile, CONST.APPLICATION_DOCX, CONST.SIZE_BUFFER);
            break;
          case 'txt':
            this.globalService.b64toBlobTxt(base64, nameFile, CONST.APPLICATION_TXT, CONST.SIZE_BUFFER);
            break;
          case 'xlsx':
            this.globalService.b64toBlobXlsx(base64, nameFile, CONST.APPLICATION_XLSX, CONST.SIZE_BUFFER);
            break;
          case 'jpg':
            this.globalService.b64toBlobJpg(base64, nameFile, CONST.APPLICATION_JPG, CONST.SIZE_BUFFER);
            break;
          default:
            this.utilsMessage.messageNotAvaible();
        }
        loadingEl.dismiss();
      },
      (err) => {
        this.utilsMessage.messageApiError(err, 'PersonalPage', 'download()');
        loadingEl.dismiss();
        this.utilsNavigate.routerNavigateNotices();
      });
    });
  }

}

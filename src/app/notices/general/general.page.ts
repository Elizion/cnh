import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { NoticesService } from '../../services/notices.service';
import { GlobalService } from '../../services/global.service';
import { UtilsMessage } from '../../utils/utils.message';
import { UtilsNavigate } from '../../utils/utils.navigate';
import { UtilsHidden } from '../../utils/utils.hidden';
import { Constants as CONST } from '../../config/config.const';
import { Messages as MESSAGE } from '../../config/config.messages';
@Component({
  selector: 'app-general',
  templateUrl: './general.page.html',
  styleUrls: ['./general.page.scss'],
})
export class GeneralPage {
  constructor(
    private loadingCtrl: LoadingController,
    private noticesService: NoticesService,
    private globalService: GlobalService,
    private utilsMessage: UtilsMessage,
    private utilsNavigate: UtilsNavigate,
    private utilsHidden: UtilsHidden
  ) {}
  isLogin = true;
  listGeneral: any[];
  descripcionAvisoGeneral: any;
  archivoBase64: any;
  nombreArchivo: any;
  visibleContent: boolean;
  cardNotFound: any = true;
  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit() {
    this.generalInit();
  }
  loadFirstElement(): void {
    if (this.listGeneral != null && this.listGeneral.length > 0 ) {
      this.descripcionAvisoGeneral = this.listGeneral[0].descripcionAvisoGeneral;
      this.archivoBase64 = this.listGeneral[0].archivoBase64;
      this.nombreArchivo = this.listGeneral[0].nombreArchivo;
    }
  }
  generalInit(): void {
    this.loadingCtrl
    .create({
      keyboardClose: true,
      spinner: null,
      message: CONST.LOADER_GIF,
      cssClass: 'custom-loader-class'
    }).then(loadingEl => {
      loadingEl.present();
      this.noticesService.general().subscribe((res: Response) => {
        const key = 'data';
        this.listGeneral = res[key];
        this.visibleContent = this.utilsHidden.visibleContent();
        this.cardNotFound = this.globalService.isVisible(this.listGeneral);
        this.loadFirstElement();
        loadingEl.dismiss();
      },
      (err) => {
        loadingEl.dismiss();
        this.utilsMessage.messageApiError(err, MESSAGE.AVISOS_GENERALES, MESSAGE.ERROR);
        this.utilsNavigate.routerNavigateNotices();
      });
    });
  }
  show(id: number, descripcionAvisoGeneral: string, archivoBase64: string, nombreArchivo: string): void {
    this.descripcionAvisoGeneral = descripcionAvisoGeneral;
    this.archivoBase64 = archivoBase64;
    this.nombreArchivo = nombreArchivo;
  }
  download(): void {
    const b64Image = this.archivoBase64;
    const nameFile = this.nombreArchivo;
    this.loadingCtrl
    .create({
      keyboardClose: true,
      spinner: null,
      message: CONST.LOADER_GIF,
      cssClass: 'custom-loader-class'
    }).then(loadingEl => {
      loadingEl.present();
      this.globalService.b64toBlobJpg(b64Image, nameFile,  CONST.APPLICATION_JPG, CONST.SIZE_BUFFER);
      loadingEl.dismiss();
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { NoticesService } from '../../services/notices.service';
import { UtilsMessage } from '../../utils/utils.message';
import { UtilsNavigate } from '../../utils/utils.navigate';
import { UtilsHidden } from '../../utils/utils.hidden';
import { Constants as CONST } from '../../config/config.const';
@Component({
  selector: 'app-general',
  templateUrl: './general.page.html',
  styleUrls: ['./general.page.scss'],
})
export class GeneralPage implements OnInit {
  constructor(
    private loadingCtrl: LoadingController,
    private noticesService: NoticesService,
    private utilsMessage: UtilsMessage,
    private utilsNavigate: UtilsNavigate,
    private utilsHidden: UtilsHidden
  ) {}
  isLogin = true;
  listGeneral: any[];
  descripcionAvisoGeneral: any;
  archivoBase64: any;
  visible: boolean;
  ngOnInit() {
    this.generalInit();
  }
  load(): void {
    if (this.listGeneral != null && this.listGeneral.length > 0 ) {
      this.descripcionAvisoGeneral = this.listGeneral[0].descripcionAvisoGeneral;
      this.archivoBase64 = this.listGeneral[0].archivoBase64;
    }
  }
  generalInit(): void {
    this.loadingCtrl
    .create({
      keyboardClose: true,
      spinner: null,
      message: CONST.LOADER_GIF,
      cssClass: 'custom-loader-class'
    })
    .then(loadingEl => {
      loadingEl.present();
      this.noticesService.general().subscribe( (res: Response) => {
        const key = 'data';
        this.listGeneral = res[key];
        if (this.listGeneral.length === 0 ) {
          this.utilsMessage.messageListVoid();
        }
        this.load();
        loadingEl.dismiss();
        this.visible = this.utilsHidden.visibleContent();
      },
      (err) => {
        loadingEl.dismiss();
        this.utilsMessage.messageApiError(err, 'GeneralPage', 'generalInit()');
        this.utilsNavigate.routerNavigateNotices();
      });
    });
  }
  show(id: number, descripcionAvisoGeneral: string, archivoBase64: string): void {
    this.descripcionAvisoGeneral = descripcionAvisoGeneral;
    this.archivoBase64 = archivoBase64;
  }

  zoom(event: any){
    event.target.classList.toggle('zoom');
  }
  
}

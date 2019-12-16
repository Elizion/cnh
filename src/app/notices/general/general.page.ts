import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { NoticesService } from '../../services/notices.service';
import { GlobalService } from '../../services/global.service';
@Component({
  selector: 'app-general',
  templateUrl: './general.page.html',
  styleUrls: ['./general.page.scss'],
})
export class GeneralPage implements OnInit {

  constructor(
    private loadingCtrl: LoadingController,
    private noticesService: NoticesService,
    private globalService: GlobalService
  ) {}

  isLoading = false;
  isLogin = true;
  listGeneral: any[];
  descripcionAvisoGeneral: any;
  archivoBase64: any;
  visible: any = false;

  ngOnInit() {
    this.general();
  }

  load(): void {
    if (this.listGeneral != null && this.listGeneral.length > 0 ) {
      this.descripcionAvisoGeneral = this.listGeneral[0].descripcionAvisoGeneral;
      this.archivoBase64 = this.listGeneral[0].archivoBase64;
    }
  }

  general(): void {
    this.isLoading = true;
    this.loadingCtrl
    .create({ keyboardClose: true, message: 'Cargando datos...' })
    .then(loadingEl => {
      loadingEl.present();
      this.noticesService.general().subscribe( (res: Response) => {
        this.listGeneral = res['data'];
        this.load();
        this.visible = true;
        this.isLoading = false;
        loadingEl.dismiss();
      },
      (err) => {
        console.log(err);
        loadingEl.dismiss();
        this.globalService.alertGeneral();
        this.globalService.routerNavigateNotices();
      });
    });
  }

  show(id: number, descripcionAvisoGeneral: string, archivoBase64: string): void {
    this.descripcionAvisoGeneral = descripcionAvisoGeneral;
    this.archivoBase64 = archivoBase64;
  }

}

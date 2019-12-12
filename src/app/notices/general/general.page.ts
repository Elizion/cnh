import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { IonItemSliding } from '@ionic/angular';
import { NoticesService } from '../../services/notices.service';
@Component({
  selector: 'app-general',
  templateUrl: './general.page.html',
  styleUrls: ['./general.page.scss'],
})
export class GeneralPage implements OnInit {

  constructor(
    private loadingCtrl: LoadingController,
    private noticesService: NoticesService
  ) {}

  isLoading = false;
  isLogin = true;
  listGeneral: any[];
  descripcionAvisoGeneral: any;
  archivoBase64: any;

  ngOnInit() {
    this.general();
  }

  load(): void{
    if (this.listGeneral != null && this.listGeneral.length > 0 ){
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
      this.noticesService.general().subscribe( (res: {} ) => {
        this.listGeneral = res['data'];
        this.load();
        this.isLoading = false;
        loadingEl.dismiss();
      });
    });
  }

  show(id: number, descripcionAvisoGeneral: string, archivoBase64: string): void {
    this.descripcionAvisoGeneral = descripcionAvisoGeneral;
    this.archivoBase64 = archivoBase64;
  }

}

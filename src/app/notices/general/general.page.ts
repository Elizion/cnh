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

  ngOnInit() {
    this.general();
  }

  general(): void {
    this.isLoading = true;
    this.loadingCtrl
    .create({ keyboardClose: true, message: 'Cargando datos...' })
    .then(loadingEl => {
      loadingEl.present();
      this.noticesService.general().subscribe( (res: {} ) => {
        this.listGeneral = res['data'];
        console.log(JSON.stringify(this.listGeneral));
        this.isLoading = false;
        loadingEl.dismiss();
      });
    });
  }

  show(id: number, slidingEl: IonItemSliding): void {
    console.log(id);
    slidingEl.close();
  }

}

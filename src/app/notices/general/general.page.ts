import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { IonItemSliding } from '@ionic/angular';
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
  idPerson = this.globalService.getIdPerson();

  ngOnInit() {
    this.personal();
  }

  personal(): void {
    this.isLoading = true;
    this.loadingCtrl
    .create({ keyboardClose: true, message: 'Cargando datos...' })
    .then(loadingEl => {
      loadingEl.present();
      this.noticesService.personal(this.idPerson).subscribe( (res: {} ) => {
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

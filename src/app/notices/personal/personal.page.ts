import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { IonItemSliding } from '@ionic/angular';
import { NoticesService } from '../../services/notices.service';
import { GlobalService } from '../../services/global.service';
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
        this.listPersonal = res['data'];
        console.log(JSON.stringify(this.listPersonal));
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

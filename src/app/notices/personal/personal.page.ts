import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { IonItemSliding } from '@ionic/angular';
import { NoticesModel } from '../../models/notices.model';
import { NoticesService } from '../../services/notices.service';
@Component({
  selector: 'app-personal',
  templateUrl: './personal.page.html',
  styleUrls: ['./personal.page.scss'],
})
export class PersonalPage implements OnInit {

  isLoading = false;
  isLogin = true;
  notices: NoticesModel[];

  constructor(
    private loadingCtrl: LoadingController,
    private noticesService: NoticesService
  ) {}

  ngOnInit() {
    this.getPersonal();
  }

  getPersonal(): void {
    this.isLoading = true;
    this.loadingCtrl
    .create({ keyboardClose: true, message: 'Cargando api fake...' })
    .then(loadingEl => {
      loadingEl.present();
      this.noticesService.getNotices().subscribe(notices => this.notices = notices);
      this.isLoading = false;
      loadingEl.dismiss();
    });
  }

  removeItem(id: number, slidingEl: IonItemSliding): void {
    let i = 0;
    for ( i; i < this.notices.length; i++ ) {
      if (this.notices[i].id === id) {
        console.log(id);
        this.notices.splice(i, 1);
        console.log(JSON.stringify(this.notices));
      }
    }
    slidingEl.close();
  }

}

import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { GeneralService } from './general.service';
@Component({
  selector: 'app-general',
  templateUrl: './general.page.html',
  styleUrls: ['./general.page.scss'],
})
export class GeneralPage implements OnInit {
  isLoading = false;
  personId: string;
  notices: any[] = [];
  constructor(
    private loadingCtrl: LoadingController,
    private generalService: GeneralService
  ) { }
  ngOnInit() {
    this.isLoading = true;
    this.loadingCtrl
    .create({ keyboardClose: true, message: 'Cargando avisos...' })
    .then(loadingEl => {
      loadingEl.present();
      this.generalService.general().subscribe((res) => {
        this.isLoading = false;
        loadingEl.dismiss();
        this.notices = res['data'];
        console.log(JSON.stringify(this.notices));
      });
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { PersonalService } from './personal.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.page.html',
  styleUrls: ['./personal.page.scss'],
})
export class PersonalPage implements OnInit {

  isLoading = false;
  personId: string;
  notices: any[] = [];

  constructor(
    private loadingCtrl: LoadingController,
    private personalService: PersonalService
  ) { }

  ngOnInit() {
    const res = window.localStorage.getItem('user');
    const value = JSON.parse(res);
    this.personId = value.data.personId;
    this.isLoading = true;
    this.loadingCtrl
    .create({ keyboardClose: true, message: 'Cargando avisos...' })
    .then(loadingEl => {
      loadingEl.present();
      this.personalService.personal(this.personId).subscribe((res) => {
        this.isLoading = false;
        loadingEl.dismiss();
        this.notices = res['data'];
        console.log(JSON.stringify(this.notices));
      });
    });


  }

}
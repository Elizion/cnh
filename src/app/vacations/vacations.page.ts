import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { VacationsModel } from '../models/vacations.model';
import { VacationsService } from '../services/vactions.service';


@Component({
  selector: 'app-vacations',
  templateUrl: './vacations.page.html',
  styleUrls: ['./vacations.page.scss'],
})
export class VacationsPage implements OnInit {

  isLoading = false;
  isLogin = true;
  vacations: VacationsModel[];

  constructor(
    private loadingCtrl: LoadingController,
    private vacationsService: VacationsService
  ) {}


  ngOnInit() {
    this.isLoading = true;
    this.loadingCtrl
    .create({ keyboardClose: true, message: 'Cargando api fake...' })
    .then(loadingEl => {
      loadingEl.present();
      this.getVacations();
      this.isLoading = false;
      loadingEl.dismiss();
    });
  }

  getVacations(): void {
    this.vacationsService.getVacations().subscribe(vacations => this.vacations = vacations);
  }



}

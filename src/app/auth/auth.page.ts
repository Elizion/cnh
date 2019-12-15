import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss']
})
export class AuthPage {

  constructor(
    private loadingCtrl: LoadingController,
    private router: Router,
    private authService: AuthService,
    private alertCtrl: AlertController
  ) {}

  isLogin = true;

  user: string;
  password: string;

  status: string;
  token: string;

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      subHeader: 'Autenticación',
      message: 'Usuario y/o contraseñas invalidos, intente de nuevo porfavor.'
    });
    await alert.present();
    setTimeout (() => {
      alert.dismiss();
    }, 3000);
  }

  onSubmit(form: NgForm) {

    if (!form.valid) {
      return;
    }

    this.user = form.value.user;
    this.password = form.value.password;

    if (this.isLogin) {

      this.loadingCtrl
      .create({ keyboardClose: true, message: 'Validando datos...' })
      .then(loadingEl => {
        loadingEl.present();
        this.pivote(this.user, this.password, loadingEl);
      });

    } else {

    }

  }

  pivote(user: any, password: any, loadingEl: any): void {
    this.authService.token().subscribe((res) => {
      this.login(res, user, password, loadingEl);
    });
  }

  login(tokenBase: any, user: any, password: any, loadingEl: any): void {
    this.authService.login(tokenBase.data, user, password).subscribe((res) => {
      this.status = res['metadata'].response;
      this.token = res['data'];
      loadingEl.dismiss();
      if (this.status === 'EXITO') {
        window.localStorage.setItem('token', JSON.stringify(this.token));
        this.router.navigateByUrl('/profile');
      } else {
        window.localStorage.removeItem('token');
        this.router.navigateByUrl('/auth');
      }
    },
    (err) => {
      console.log(err);
      loadingEl.dismiss();
      this.presentAlert();
      this.router.navigateByUrl('/auth');
    });

  }

}


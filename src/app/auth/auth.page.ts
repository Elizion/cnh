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

  isLoading = false;
  isLogin = true;
  user: string;
  password: string;
  error: any;
  title: any;

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
    this.isLoading = true;
    this.user = form.value.user;
    this.password = form.value.password;

    if (this.isLogin) {
      this.loadingCtrl
      .create({ keyboardClose: true, message: 'Iniciando sesión...' })
      .then(loadingEl => {
        loadingEl.present();
        this.pivote(this.user, this.password, loadingEl);
      });
    } else {
    }
  }

  pivote(user: any, password: any, loadingEl: any): void {
    let tokenBase = null;
    this.authService.token().subscribe((resToken) => {
      tokenBase = resToken;
      this.login(tokenBase, user, password, loadingEl);
    });
  }

  login(tokenBase: any, user: any, password: any, loadingEl: any): void {
    let token = null;
    this.authService.login(tokenBase.data, user, password).subscribe((res) => {
      token = res;
      window.localStorage.setItem('token', JSON.stringify(token));
      this.close(loadingEl);
    },
    () => {
      this.close(loadingEl);
      this.presentAlert();
    });
  }

  close(loadingEl: any): void {
    loadingEl.dismiss();
    this.isLoading = false;
    this.router.navigateByUrl('/profile');
  }

}


import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { IonItemSliding } from '@ionic/angular';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss']
})
export class AuthPage {

  constructor(
    private loadingCtrl: LoadingController,
    private router: Router,
    private authService: AuthService
  ) {}

  isLoading = false;
  isLogin = true;
  error: any;

  onSubmit(form: NgForm) {

    if (!form.valid) {
      return;
    }

    this.isLoading = true;
    const user = form.value.user;
    const password = form.value.password;

    if (this.isLogin) {
      this.loadingCtrl
      .create({ keyboardClose: true, message: 'Iniciando sesión...' })
      .then(loadingEl => {
        loadingEl.present();
        this.pivote(user, password, loadingEl);
      });

    } else {

    }

  }

  pivote(user: any, password: any, loadingEl: any) {
    let tokenBase = null;
    this.authService.token().subscribe((resToken) => {
      tokenBase = resToken;
      this.login(tokenBase, user, password, loadingEl);
    });
  }

  login(tokenBase: any, user: any, password: any, loadingEl: any) {
    let tokenFinal = null;
    this.authService.login(tokenBase.data, user, password).subscribe((resTokenFinal) => {
      tokenFinal = resTokenFinal;
      this.token(tokenFinal, loadingEl);
    });
  }

  token(tokenFinal: any, loadingEl: any) {
    this.authService.user(tokenFinal.data).subscribe((resUser) => {
      window.localStorage.setItem('user', JSON.stringify(resUser));
      this.redirect(loadingEl);
    });
  }

  redirect(loadingEl: any) {
    this.isLoading = false;
    loadingEl.dismiss();
    this.router.navigateByUrl('/profile');
  }

}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss']
})
export class AuthPage {
  isLoading = false;
  isLogin = true;
  error: any;
  constructor(
    private loadingCtrl: LoadingController,
    private router: Router,
    private authService: AuthService
  ) {}
  onSubmit(form: NgForm) {

    if (!form.valid) {
      return;
    }

    this.isLoading = true;
    let tokenBase = null;
    let tokenFinal = null;
    const user = form.value.user;
    const password = form.value.password;

    if (this.isLogin) {
      this.loadingCtrl
      .create({ keyboardClose: true, message: 'Iniciando sesión...' })
      .then(loadingEl => {
        loadingEl.present();
        this.authService.token().subscribe((resToken) => {
          tokenBase = resToken;
          this.authService.login(tokenBase.data, user, password).subscribe((resTokenFinal) => {
            tokenFinal = resTokenFinal;
            this.authService.user(tokenFinal.data).subscribe((resUser) => {
              this.isLoading = false;
              window.localStorage.setItem('user', JSON.stringify(resUser));
              loadingEl.dismiss();
              this.router.navigateByUrl('/profile');
            });
          });
        });
      });
    } else {

    }

  }
}

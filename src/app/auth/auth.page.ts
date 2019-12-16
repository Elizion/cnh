import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { GlobalService } from '../services/global.service';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss']
})
export class AuthPage {

  constructor(
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private globalService: GlobalService
  ) {}

  isLogin = true;
  user: string;
  password: string;
  status: string;
  token: string;

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.user = form.value.user;
    this.password = form.value.password;
    this.loadingCtrl
    .create({ keyboardClose: true, message: 'Validando...' })
    .then(loadingEl => {
      loadingEl.present();
      this.pivote(this.user, this.password, loadingEl);
    });
  }

  pivote(user: any, password: any, loadingEl: any): void {
    this.authService.token().subscribe((res: Response) => {
      this.login(res, user, password, loadingEl);
    },
    (err) => {
      console.log(err);
      loadingEl.dismiss();
      this.globalService.alertToken();
      this.globalService.routerNavigateAuth();
    });
  }

  login(tokenBase: any, user: any, password: any, loadingEl: any): void {
    this.authService.login(tokenBase.data, user, password).subscribe((res: Response) => {
      this.status = res['metadata'].response;
      this.token = res['data'];
      loadingEl.dismiss();
      if (this.status === 'EXITO') {
        window.localStorage.setItem('token', JSON.stringify(this.token));
        this.globalService.routerNavigateProfile();
      } else {
        window.localStorage.removeItem('token');
        this.globalService.routerNavigateAuth();
      }
    },
    (err) => {
      console.log(err);
      loadingEl.dismiss();
      this.globalService.alertLogin();
      this.globalService.routerNavigateAuth();
    });
  }

}


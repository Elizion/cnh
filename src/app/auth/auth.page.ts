import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { UtilsMessage } from '../utils/utils.message';
import { UtilsNavigate } from '../utils/utils.navigate';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss']
})
export class AuthPage {

  constructor(
    private loadingCtrl: LoadingController,
    private utilsMessage: UtilsMessage,
    private utilsNavigate: UtilsNavigate,
    private authService: AuthService
  ) {}

  showPassword = true;
  isLogin = true;
  user: string;
  password: string;
  token: string;

  onPasswordToggle(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.user = form.value.user;
    this.password = form.value.password;
    this.loadingCtrl
    .create({ keyboardClose: true, message: this.utilsMessage.messageValidating() })
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
      loadingEl.dismiss();
      this.utilsMessage.messageApiError(err, 'AuthPage', 'pivote()');
      this.utilsNavigate.routerNavigateAuth();
    });
  }

  login(tokenBase: any, user: any, password: any, loadingEl: any): void {
    this.authService.login(tokenBase.data, user, password).subscribe((res: Response) => {
      const keyData = 'data';
      const keyMetadata = '';
      const status = res[keyMetadata].response;
      this.token = res[keyData];
      if (status === 'EXITO') {
        window.localStorage.setItem('token', JSON.stringify(this.token));
        this.utilsNavigate.routerNavigateProfile();
      } else {
        window.localStorage.removeItem('token');
        this.utilsNavigate.routerNavigateAuth();
      }
      loadingEl.dismiss();
    },
    (err) => {
      loadingEl.dismiss();
      this.utilsMessage.messageApiError(err, 'AuthPage', 'login()');
      this.utilsNavigate.routerNavigateAuth();
    });
  }

}

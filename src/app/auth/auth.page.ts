import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { AuthService } from './auth.service';
//import { TokenStorage } from './auth.token';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss']
})
export class AuthPage implements OnInit {
  isLoading = false;
  isLogin = true;
  response = null;
  constructor(
    private authService: AuthService,
    //private token: TokenStorage,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}
  ngOnInit() {
  }
  onLogin() {
    this.isLoading = true;
    this.authService.generateToken().subscribe(res => {
      this.response = res;
      //this.token.saveToken(this.response.data);
      //console.log(this.token.getToken());
    });
    this.loadingCtrl
    .create({ keyboardClose: true, message: 'Generando token...' })
    .then(loadingEl => {
      loadingEl.present();
      setTimeout(() => {
        this.isLoading = false;
        loadingEl.dismiss();
        this.router.navigateByUrl('/user');
      }, 3000);
    });
  }
  onSubmitFunction(form: NgForm) {

    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    console.log(email, password);
    if (this.isLogin) {
      // Send a request to login servers
    } else {
      // Send a request to signup servers
    }
  }
}
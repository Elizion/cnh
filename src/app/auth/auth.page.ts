import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { AuthService } from './auth.service';
import { ProfileService } from '../profile/profile.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss']
})
export class AuthPage {

  isLoading = false;
  isLogin = true;

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

  onSubmit(form: NgForm) {
    
    if (!form.valid) {
      return;
    }
    //this.isLoading = true;
    //let tokenBase = null;
    //let tokenFinal = null;
    const user = form.value.user;
    const password = form.value.password;

    console.log(user + ' ' + password);

    if (this.isLogin) {

      /*
      this.loadingCtrl
      .create({ keyboardClose: true, message: 'Cargando servicios...' })
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
      */

      this.router.navigateByUrl('/profile');

    } else {

    }
  }
}


/*
[
  {
    "id": 1,
    "name": "Luke Cage",
    "aliases": ["Carl Lucas", "Power Man", "Mr. Bulletproof", "Hero for Hire"],
    "occupation": "bartender",
    "gender": "male",
    "height": {
      "ft": 6,
      "in": 3
    },
    "hair": "bald",
    "eyes": "brown",
    "powers": [
      "strength",
      "durability",
      "healing"
    ]
  },
  {
    "id": 2,
    "name": "Luke Cage",
    "aliases": ["Carl Lucas", "Power Man", "Mr. Bulletproof", "Hero for Hire"],
    "occupation": "bartender",
    "gender": "male",
    "height": {
      "ft": 6,
      "in": 3
    },
    "hair": "bald",
    "eyes": "brown",
    "powers": [
      "strength",
      "durability",
      "healing"
    ]
  },
  {
    "id": 3,
    "name": "Luke Cage",
    "aliases": ["Carl Lucas", "Power Man", "Mr. Bulletproof", "Hero for Hire"],
    "occupation": "bartender",
    "gender": "male",
    "height": {
      "ft": 6,
      "in": 3
    },
    "hair": "bald",
    "eyes": "brown",
    "powers": [
      "strength",
      "durability",
      "healing"
    ]
  }
]
interface User {
  id: number;
  name: string;
  aliases: string[];
  occupation: string;
  gender: string;
  height: {ft: number; in: number;}
  hair: string;
  eyes: string;
  powers: string[]
}
const Users = <User[]>require('../data');
*/
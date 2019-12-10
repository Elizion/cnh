import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { ProfileModel } from './models/profile.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  
  public profile: ProfileModel;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private router: Router,
  ) {
    this.initializeApp();
    this.profile = new ProfileModel();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }


  ngOnInit() {
    const request                       = window.localStorage.getItem('user');
    const response                      = JSON.parse(request);
    this.profile.personId               = response.data.personId;
    this.profile.nombre                 = response.data.nombre;
    this.profile.numeroEmpleado         = response.data.numeroEmpleado;
    this.profile.unidad                 = response.data.unidad;
    this.profile.puesto                 = response.data.puesto;
    this.profile.cargo                  = response.data.cargo;
    this.profile.nivel                  = response.data.nivel;
    this.profile.rfc                    = response.data.rfc;
    this.profile.fechaIngresoFormat     = response.data.fechaIngresoFormat;
    this.profile.fotoBase64             = response.data.fotoBase64;
  }

  
  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }
}

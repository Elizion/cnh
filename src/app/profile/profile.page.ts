import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ProfileService } from '../api/profile.service';
import { Profile } from './profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  loadedProfile: Profile[];
  constructor(
    private profileService: ProfileService,
    private menuCtrl: MenuController
  ) {}
  ngOnInit() {
    this.loadedProfile = this.profileService.profile;
  }
  onOpenMenu() {
    this.menuCtrl.toggle();
  }
}

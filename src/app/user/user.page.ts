import { Component, OnInit} from '@angular/core';
import { MenuController } from '@ionic/angular';
import { UserService } from './user.service';
import { User } from './user.model';
@Component({
  selector: 'app-profile',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  loadedUser: User[];
  constructor(
    private userService: UserService,
    private menuCtrl: MenuController,
  ) {}
  ngOnInit() {   
    this.loadedUser = this.userService.getUser;
  }  
  onOpenMenu() {
    this.menuCtrl.toggle();
  }
}
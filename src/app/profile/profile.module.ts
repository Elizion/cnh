import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProfilePageRoutingModule } from './profile-routing.module';
import { AuthService } from '../auth/auth.service';
import { ProfilePage } from '../profile/profile.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule    
  ],
  declarations: [ProfilePage],
  providers: [AuthService]
})
export class ProfilePageModule {}

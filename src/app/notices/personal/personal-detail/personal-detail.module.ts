import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PersonalDetailPage } from './personal-detail.page';
import { Routes } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    component: PersonalDetailPage
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [PersonalDetailPage]
})
export class PersonalDetailPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GeneralPage } from './general.page';
import { Routes, RouterModule } from '@angular/router';
import { PinchZoomModule } from 'ngx-pinch-zoom';
const routes: Routes = [
  {
    path: '',
    component: GeneralPage
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PinchZoomModule
  ],
  declarations: [GeneralPage]
})
export class GeneralPageModule {}

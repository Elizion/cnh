import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VacationsPageRoutingModule } from './vacations-routing.module';

import { VacationsPage } from './vacations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VacationsPageRoutingModule
  ],
  declarations: [VacationsPage]
})
export class VacationsPageModule {}

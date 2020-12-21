import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LicensesDetailPageRoutingModule } from './licenses-detail-routing.module';

import { LicensesDetailPage } from './licenses-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LicensesDetailPageRoutingModule
  ],
  declarations: [LicensesDetailPage]
})
export class LicensesDetailPageModule {}

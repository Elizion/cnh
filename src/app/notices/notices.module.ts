import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoticesPageRoutingModule } from './notices-routing.module';

import { NoticesPage } from './notices.page';
import { NoticesService } from './notices.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NoticesService,
    NoticesPageRoutingModule
  ],
  declarations: [NoticesPage]
})
export class NoticesPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VacationsPageRoutingModule } from './vacations-routing.module';
import { VacationsPage } from './vacations.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxDatatableModule,
    VacationsPageRoutingModule
  ],
  declarations: [VacationsPage]
})
export class VacationsPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PayrollPageRoutingModule } from './payroll-routing.module';
import { PayrollPage } from './payroll.page';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayrollPageRoutingModule
  ],
  declarations: [PayrollPage],
    providers: [File, FileOpener]
})
export class PayrollPageModule {}

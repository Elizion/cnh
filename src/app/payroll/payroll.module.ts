import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/file/ngx';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PayrollPageRoutingModule } from './payroll-routing.module';
import { PayrollPage } from './payroll.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayrollPageRoutingModule
  ],
  declarations: [PayrollPage],
  providers:[
    FileTransfer,
    FileChooser,
    FilePath,
    File
  ]
})
export class PayrollPageModule {}

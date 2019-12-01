import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/file/ngx';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.page.html',
  styleUrls: ['./payroll.page.scss'],
})
export class PayrollPage implements OnInit {
  constructor(
    private fileTransfer: FileTransfer,
    private fileChooser: FileChooser,
    private filePath: FilePath,
    private file: File
  ) { }
  ngOnInit() { 
  }
  download() {
    console.log("CALL DOWNLOAD FUNCTION VOID")
    /*
    const fileTransfer: FileTransferObject = this.fileTransfer.create();
    const url = 'https://devdactic.com/html/5-simple-hacks-LBT.pdf';
    fileTransfer.download(url, this.file.externalRootDirectory  + 'file.pdf').then((entry) => {
        alert('Download complete: ' + entry.toURL());
      }, (error) => {
        alert('ERROR: ' + error);
    });
    */
  }
}

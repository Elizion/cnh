import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { IonItemSliding } from '@ionic/angular';
import { VacationsModel } from '../models/vacations.model';
import { VacationsService } from '../services/vactions.service';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Constants } from '../config/config.const';
@Component({
  selector: 'app-vacations',
  templateUrl: './vacations.page.html',
  styleUrls: ['./vacations.page.scss'],
})
export class VacationsPage implements OnInit {
  isLoading = false;
  isLogin = true;
  b64Data: string = Constants.FILE_PDF_BASE64;
  host: string = Constants.HOST;
  base: string = Constants.BASE;
  module: string = Constants.MODULE[0];
  vacations: VacationsModel[];
  constructor(
    private platform: Platform,
    private loadingCtrl: LoadingController,
    private file: File,
    private fileOpener: FileOpener,
    private vacationsService: VacationsService
  ) {}
  ngOnInit() {
    this.getVacations();
  }
  removeItem(id: number, slidingEl: IonItemSliding) {
    let i = 0;
    for ( i; i < this.vacations.length; i++ ) {
      if (this.vacations[i].id === id) {
        console.log(id);
        this.vacations.splice(i, 1);
        console.log(JSON.stringify(this.vacations));
      }
    }
    slidingEl.close();
  }
  getVacations(): void {
    this.isLoading = true;
    this.loadingCtrl
    .create({ keyboardClose: true, message: 'Cargando api fake...' })
    .then(loadingEl => {
      loadingEl.present();
      this.vacationsService.getVacations().subscribe(vacations => this.vacations = vacations);
      this.isLoading = false;
      loadingEl.dismiss();
    });
  }
  count() {
    alert(this.vacations.length);
  }
  restart() {
    this.getVacations();
  }
  action(slidingEl: IonItemSliding) {
    this.b64toBlob(this.b64Data, 'application/pdf', 512);
    slidingEl.close();
  }
  b64toBlob(b64Data, contentType, sliceSize) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type: contentType });
    const fileName = 'vacaciones.pdf';
    const filePath = (this.platform.is('android')) ? this.file.externalRootDirectory : this.file.cacheDirectory;
    this.file.writeFile(filePath, fileName, blob, { replace: true }).then((fileEntry) => {
      console.log('File created!');
      this.fileOpener.open(fileEntry.toURL(), 'application/pdf')
        .then(() => console.log('File is opened'))
        .catch(err => console.error('Error openening file: ' + err));
    })
    .catch((err) => {
      console.error('Error creating file: ' + err);
      throw err;
    });
  }}
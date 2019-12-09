import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { IonItemSliding } from '@ionic/angular';
import { VacationsService } from '../services/vacations.service';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Constants as CONST } from '../config/config.const';
@Component({
  selector: 'app-vacations',
  templateUrl: './vacations.page.html',
  styleUrls: ['./vacations.page.scss'],
})
export class VacationsPage implements OnInit {


  isLoading = false;
  isLogin = true;
  vacations: any[];

  botonCancelar: any;
  botonModificar: any;
  botonImprimir: any;
  botonImprimirModificacion: any;
  personId: number;
  b64Data = CONST.FILE_PDF_BASE64;

  constructor(
    private platform: Platform,
    private loadingCtrl: LoadingController,
    private vacationsService: VacationsService,
    private file: File,
    private fileOpener: FileOpener
  ) { }

  ngOnInit() {
    this.postVacations();
  }

  postVacations(): void {

    const request   = window.localStorage.getItem('user');
    const response  = JSON.parse(request);
    this.personId   = response.data.personId;

    this.isLoading = true;
    this.loadingCtrl
    .create({ keyboardClose: true, message: 'Cargando datos...' })
    .then(loadingEl => {
      loadingEl.present();
      this.vacationsService.postVacations(this.personId).subscribe( (res: {} ) => {
        this.vacations                  = res['data'].listaDias;
        this.botonCancelar              = res['data'].botonCancelar;
        this.botonModificar             = res['data'].botonModificar;
        this.botonImprimir              = res['data'].botonImprimir;
        this.botonImprimirModificacion  = res['data'].botonImprimirModificacion;
        this.isLoading                  = false;
        loadingEl.dismiss();
      });
    });
  }

  restart() {
    this.postVacations();
  }

  count() {
    alert(this.vacations.length);
  }

  removeItem(id: number, slidingEl: IonItemSliding) {
    let i = 0;
    for ( i; i < this.vacations.length; i++ ) {
      if (this.vacations[i].idVacaciones === id) {
        console.log(id);
        this.vacations.splice(i, 1);
        console.log(JSON.stringify(this.vacations));
      }
    }
    slidingEl.close();
  }

  download() {
    this.b64toBlob(this.b64Data, 'application/pdf', 512);
  }

  b64toBlob(b64Data: string, contentType: string, sliceSize: number) {
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
  }
}

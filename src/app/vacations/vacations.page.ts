import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { IonItemSliding } from '@ionic/angular';
import { GlobalService } from '../services/global.service';
import { VacationsService } from '../services/vacations.service';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Constants as CONST } from '../config/config.const';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
@Component({
  selector: 'app-vacations',
  templateUrl: './vacations.page.html',
  styleUrls: ['./vacations.page.scss'],
})
export class VacationsPage implements OnInit {

  constructor(
    private platform: Platform,
    private loadingCtrl: LoadingController,
    private globalService: GlobalService,
    private vacationsService: VacationsService,
    private file: File,
    private fileOpener: FileOpener
  ) { }

  isLoading = false;
  isLogin = true;
  listDaysDefault: any[];
  listDaysGenerate: any[];
  botonCancelar: any;
  botonModificar: any;
  botonImprimir: any;
  botonImprimirModificacion: any;
  b64Data = CONST.FILE_PDF_BASE64;
  diasDisponibles: any;
  idPerson = this.globalService.getIdPerson();

  postVacations(): void {
    this.isLoading = true;
    this.loadingCtrl
    .create({ keyboardClose: true, message: 'Cargando datos...' })
    .then(loadingEl => {
      loadingEl.present();
      this.vacationsService.postVacations(this.idPerson).subscribe( (res: {} ) => {
        this.diasDisponibles            = res['data.diasDisponibles'];
        this.listDaysDefault            = res['data.listaDias'];
        this.botonCancelar              = res['data.botonCancelar'];
        this.botonModificar             = res['data.botonModificar'];
        this.botonImprimir              = res['data.botonImprimir'];
        this.botonImprimirModificacion  = res['data.botonImprimirModificacion'];
        this.isLoading                  = false;
        loadingEl.dismiss();
      });
    });
  }

  ngOnInit() {
    this.postVacations();
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const startDate = moment(form.value.started).format('DD/MM/YYYY');
    const endDate = moment(form.value.finished).format('DD/MM/YYYY');
    console.log(startDate + ' ' + endDate);
    this.isLoading = true;
    this.loadingCtrl
    .create({ keyboardClose: true, message: 'Agregando fechas...' })
    .then(loadingEl => {
      loadingEl.present();
      this.vacationsService.postAddVacations(this.idPerson, this.diasDisponibles, startDate, endDate, this.listDaysDefault).subscribe((res: {} ) => {
        this.listDaysGenerate     = res['data'].listaDias;
        this.listDaysDefault      = this.listDaysGenerate;
        this.isLoading            = false;
        loadingEl.dismiss();
        console.log('EXEC REQUEST' + JSON.stringify(this.listDaysDefault));
        console.log('******');
        console.log('******');
        console.log('******');
        console.log('EXEC RESPONSE' + JSON.stringify(this.listDaysGenerate));
      });
  });

  }

  restart() {
    this.postVacations();
  }

  count() {
    alert(this.listDaysDefault.length);
  }

  removeItem(id: number, slidingEl: IonItemSliding) {
    let i = 0;
    for ( i; i < this.listDaysDefault.length; i++ ) {
      if (this.listDaysDefault[i].idVacaciones === id) {
        console.log(id);
        this.listDaysDefault.splice(i, 1);
        console.log(JSON.stringify(this.listDaysDefault));
      }
    }
    slidingEl.close();
  }

  impress() {
    let i = 0;
    const newArray = [];
    for ( i; i < this.listDaysDefault.length; i++ ) {
      if (this.listDaysDefault[i].estatusFormat === 'A') {
        newArray.push(this.listDaysDefault[i]);
      }
    }
    console.log(JSON.stringify(newArray));
    this.listDaysDefault = newArray;
    return newArray;
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

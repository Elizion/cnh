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
  diasPendientes: any;
  periodoEscalonado: any = false;
  idPerson = this.globalService.getIdPerson();

  postVacations(): void {
    this.isLoading = true;
    this.loadingCtrl
    .create({ keyboardClose: true, message: 'Cargando datos...' })
    .then(loadingEl => {
      loadingEl.present();
      this.vacationsService.postVacations(this.idPerson).subscribe( (res: {} ) => {
        this.diasDisponibles            = res['data'].diasDisponibles;
        this.diasPendientes             = res['data'].diasPendientes;
        this.listDaysDefault            = res['data'].listaDias;
        this.botonCancelar              = res['data'].botonCancelar;
        this.botonModificar             = res['data'].botonModificar;
        this.botonImprimir              = res['data'].botonImprimir;
        this.botonImprimirModificacion  = res['data'].botonImprimirModificacion;
        this.isLoading                  = false;
        loadingEl.dismiss();
      });
    });
  }

  changeToggle() {
    console.log(this.periodoEscalonado + ' is checked');
    return this.periodoEscalonado;
  }

  ngOnInit() {
    console.log(this.periodoEscalonado);
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
      this.vacationsService.postAddVacations(
        this.idPerson,
        this.diasDisponibles,
        startDate,
        endDate,
        this.listDaysDefault
      ).subscribe((res: {} ) => {
        this.listDaysGenerate = res['data'].listaDias;
        this.listDaysDefault  = this.listDaysGenerate;
        this.isLoading        = false;
        loadingEl.dismiss();
      });
    });
  }

  restart(): void {
    this.postVacations();
  }

  count(): void {
    alert(this.listDaysDefault.length);
  }

  removeItem(id: number, slidingEl: IonItemSliding): void {

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

  impress(): void {
    let i = 0;
    const newArray = [];
    let period = '';
    for ( i; i < this.listDaysDefault.length; i++ ) {
      if (this.listDaysDefault[i].estatusFormat === 'S') {
        newArray.push(this.listDaysDefault[i]);
      }
    }
    if (this.periodoEscalonado === false) {
      period = 'N';
    }
    if (this.periodoEscalonado === true) {
      period = 'S';
    }
    this.vacationsService.file(this.idPerson, this.diasDisponibles, period, this.diasPendientes, newArray).subscribe((res: {} ) => {
      alert(JSON.stringify(res['data'].archivoBase64));
    });
  }
  download(): void {
    this.b64toBlob(this.b64Data, 'application/pdf', 512);
  }
  b64toBlob(b64Data: string, contentType: string, sliceSize: number): void {

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

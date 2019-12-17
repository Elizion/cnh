import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { IonItemSliding } from '@ionic/angular';
import { GlobalService } from '../services/global.service';
import { VacationsService } from '../services/vacations.service';
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
    private loadingCtrl: LoadingController,
    private globalService: GlobalService,
    private vacationsService: VacationsService
  ) { }

  isLoading = false;
  isLogin = true;
  btnCancelar: any;
  btnModificar: any;
  btnImprimir: any;
  btnImprimirModificacion: any;
  checkPeriodoEscalonado: any;
  listDaysDefault: any[];
  listDaysGenerate: any[];
  diasDisponibles: any;
  diasPendientes: any;
  fechaInicial: any;
  fechaIngresoFormat: any;
  periodoEscalonado: any = false;
  b64Data: any;
  idPerson = this.globalService.personId();
  visible: any = false;

  ngOnInit() {
    this.postVacations();
  }

  buttonsRefresh(res: any): void {
    this.btnCancelar              = res['data'].botonCancelar;
    this.btnModificar             = res['data'].botonModificar;
    this.btnImprimir              = res['data'].botonImprimir;
    this.btnImprimirModificacion  = res['data'].botonImprimirModificacion;
    this.checkPeriodoEscalonado   = res['data'].checkPeriodoEscalonado;
  }

  postVacations(): void {
    this.isLoading = true;
    this.loadingCtrl
    .create({ keyboardClose: true, message: 'Cargando datos...' })
    .then(loadingEl => {
      loadingEl.present();
      this.vacationsService.postVacations(this.idPerson).subscribe( (res: Response ) => {
        this.diasDisponibles      = res['data'].diasDisponibles;
        this.diasPendientes       = res['data'].diasPendientes;
        this.fechaInicial         = res['data'].fechaInicialFormat;
        this.fechaIngresoFormat   = res['data'].periodoEmpleado.fechaIngresoFormat;
        this.listDaysDefault      = res['data'].listaDias;

        if (this.listDaysDefault.length === 0 ) {
          this.globalService.alertListVoidVacations();
        }

        console.log(this.listDaysDefault);
        this.buttonsRefresh(res);
        this.isLoading            = false;
        this.visible = true;
        loadingEl.dismiss();
      },
      (err) => {
        console.log(err);
        loadingEl.dismiss();
        this.globalService.alertVacations();
        this.globalService.routerNavigateVacations();
      });
    });
  }
  /*
  detailArray(listDaysDefault: any) {
    const listDaysDefaultNew = [];
    let i = 0;
    const nodo = {
      idVacaciones: String,
      personId: String,
      fecha: String,
      fechaFormat: String,
      estatus: String,
      estatusFormat: String,
      estatusDescripcion: String,
      fechaRegistro: String
    };
    for (i; i < listDaysDefault.length; i++ ) {
      nodo.idVacaciones       = listDaysDefault[i].idVacaciones;
      nodo.personId           = listDaysDefault.personId;
      nodo.fecha              = listDaysDefault.fecha;
      nodo.fechaFormat        = listDaysDefault.fechaFormat;
      nodo.estatusDescripcion = listDaysDefault.estatusDescripcion;
      nodo.fechaRegistro      = listDaysDefault.fechaRegistro;
      listDaysDefaultNew.push(nodo);
    }
    this.listDaysDefault = listDaysDefaultNew;
    return  this.listDaysDefault;
  }
  */
  cancel(): void {
    alert('Trabajando este modulo...');
  }

  impressUpdate(): void {
    alert('Trabajando este modulo...');
  }

  update(): void {
    alert('Trabajando este modulo...');
  }

  changeToggle() {
    console.log(this.periodoEscalonado + ' is checked');
    return this.periodoEscalonado;
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
    .create({ keyboardClose: true, message: 'Carcando datos...' })
    .then(loadingEl => {
      loadingEl.present();
      this.vacationsService.postAddVacations(
        this.idPerson,
        this.diasDisponibles,
        startDate,
        endDate,
        this.listDaysDefault
      ).subscribe((res: Response ) => {
        this.listDaysGenerate = res['data'].listaDias;
        this.listDaysDefault  = this.listDaysGenerate;
        this.isLoading        = false;
        loadingEl.dismiss();
      },
      (err) => {
        console.log(err);
        loadingEl.dismiss();
        this.globalService.alertFormVacations();
        this.globalService.routerNavigateVacations();
      });
    });
  }

  refresh(): void {
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
    this.loadingCtrl
    .create({ keyboardClose: true, message: 'Descargando solicitud...' })
    .then(loadingEl => {
      loadingEl.present();
      this.vacationsService.file(this.idPerson, this.diasDisponibles, period, this.diasPendientes, newArray).subscribe((res: {} ) => {
        
        console.log(JSON.stringify(res['data'].archivoBase64));
        
        const nameFile = res['data'].nombreArchivo;

        this.b64Data = res['data'].archivoBase64;
        this.download(this.b64Data, nameFile);
        loadingEl.dismiss();
      },
      (err) => {
        console.log(err);
        loadingEl.dismiss();
        this.globalService.alertImpressVacations();
        this.globalService.routerNavigateVacations();
      });
    });
  }

  download(b64Data: string, nameFile: string): void {
    this.globalService.b64toBlobPdf(b64Data, nameFile,  CONST.APPLICATION_PDF, CONST.SIZE_BUFFER);
  }

  save(): void {
    console.log(JSON.stringify(this.listDaysGenerate));
    this.loadingCtrl
    .create({ keyboardClose: true, message: 'Guardando fechas...' })
    .then(loadingEl => {
      loadingEl.present();
      this.vacationsService.save(
        this.idPerson,
        this.fechaInicial,
        this.fechaIngresoFormat,
        this.diasPendientes,
        this.listDaysGenerate
      ).subscribe((res: Response ) => {
        console.log('FINAL: ' + JSON.stringify(res));
        this.listDaysDefault = res['data'].listaDias;
        this.buttonsRefresh(res);
        loadingEl.dismiss();
      },
      (err) => {
        console.log(err);
        loadingEl.dismiss();
        this.globalService.alertSaveVacations();
        this.globalService.routerNavigateVacations();
      });
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { IonItemSliding } from '@ionic/angular';
import { GlobalService } from '../services/global.service';
import { VacationsService } from '../services/vacations.service';
import { Constants as CONST } from '../config/config.const';
import { NgForm } from '@angular/forms';
import { UtilsMessage } from '../utils/utils.message';
import { UtilsNavigate } from '../utils/utils.navigate';
import { UtilsHidden } from '../utils/utils.hidden';
import * as moment from 'moment';
@Component({
  selector: 'app-vacations',
  templateUrl: './vacations.page.html',
  styleUrls: ['./vacations.page.scss'],
})
export class VacationsPage implements OnInit {

  constructor(
    private loadingCtrl: LoadingController,
    private utilsMessage: UtilsMessage,
    private utilsNavigate: UtilsNavigate,
    private utilsHidden: UtilsHidden,
    private globalService: GlobalService,
    private vacationsService: VacationsService
  ) { }

  isLoading = false;
  isLogin = true;
  btnCancelar: any;
  btnModificar: any;
  btnImprimir: any;
  checkPeriodoEscalonado: any;
  listDaysDefault: any[];
  listDaysGenerate: any[];
  diasDisponibles: any;
  diasPendientes: any;
  fechaInicial: any;
  fechaIngresoFormat: string;
  fechaInicialFormat: any;
  periodoEscalonado: any = false;
  b64Data: any;
  idPerson = this.globalService.personId();
  visible: boolean;

  ngOnInit() {    
    this.vacationsInit();
  }

  buttonsRefresh(res: any): void {
    const key = 'data';
    this.btnCancelar              = res[key].botonCancelar;
    this.btnModificar             = res[key].botonModificar;
    this.btnImprimir              = res[key].botonImprimir;
    this.checkPeriodoEscalonado   = res[key].checkPeriodoEscalonado;
  }

  vacationsInit(): void {
    this.loadingCtrl
    .create({ keyboardClose: true, message: this.utilsMessage.messageCharging() })
    .then(loadingEl => {
      loadingEl.present();
      this.vacationsService.postVacations(this.idPerson).subscribe( (res: Response ) => {
        const key = 'data';
        this.diasDisponibles      = res[key].diasDisponibles;
        this.diasPendientes       = res[key].diasPendientes;
        this.fechaInicial         = res[key].fechaInicialFormat;
        this.fechaIngresoFormat   = res[key].periodoEmpleado.fechaIngresoFormat;
        this.listDaysDefault      = res[key].listaDias;
        this.fechaInicialFormat   = res[key].fechaInicialFormat;
        localStorage.setItem('date', JSON.stringify(this.fechaInicialFormat));
        if (this.listDaysDefault.length === 0 ) {
          this.utilsMessage.messageListVoid();
        }
        this.buttonsRefresh(res);
        this.visible = this.utilsHidden.visibleContent();
        loadingEl.dismiss();
      },
      (err) => {
        loadingEl.dismiss();
        this.utilsMessage.messageApiError(err, 'Consulta inicial', 'Error');
        this.utilsNavigate.routerNavigateVacations();
      });
    });
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const startDate = moment(form.value.started).format('DD/MM/YYYY');
    const endDate = moment(form.value.finished).format('DD/MM/YYYY');
    this.loadingCtrl
    .create({ keyboardClose: true, message: this.utilsMessage.messageCharging() })
    .then(loadingEl => {
      loadingEl.present();
      this.vacationsService.postAddVacations(
        this.idPerson,
        this.diasDisponibles,
        startDate,
        endDate,
        this.listDaysDefault
      ).subscribe((res: Response ) => {
        const key = 'data';
        this.listDaysGenerate = res[key].listaDias;
        this.listDaysDefault  = this.listDaysGenerate;
        if (res[key].mensajes !== 'undefined') {
          const mensajes: string[] = res[key].mensajes;
          if (mensajes != null && mensajes.length > 0) {
            this.utilsMessage.messageParamethersArray(mensajes, 'Vacaciones', 'Agregar días');
          }
        }
        loadingEl.dismiss();
      },
      (err) => {
        loadingEl.dismiss();
        this.utilsMessage.messageApiError(err, 'Vacaciones', 'Agregar días');
        this.utilsNavigate.routerNavigateVacations();
      });
    });
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
    .create({ keyboardClose: true, message: this.utilsMessage.messageDownloading() })
    .then(loadingEl => {
      loadingEl.present();
      this.vacationsService.file(this.idPerson, this.diasDisponibles, period, this.diasPendientes, newArray).subscribe((res: {} ) => {
        const key = 'data';
        const nameFile = res[key].nombreArchivo;
        this.b64Data = res[key].archivoBase64;
        this.download(this.b64Data, nameFile);
        loadingEl.dismiss();
      },
      (err) => {
        loadingEl.dismiss();
        this.utilsMessage.messageApiError(err, 'VacationsPage', 'impress()');
        this.utilsNavigate.routerNavigateVacations();
      });
    });
  }

  download(b64Data: string, nameFile: string): void {
    this.globalService.b64toBlobPdf(b64Data, nameFile,  CONST.APPLICATION_PDF, CONST.SIZE_BUFFER);
  }

  save(): void {
    this.loadingCtrl
    .create({ keyboardClose: true, message: this.utilsMessage.messageCharging() })
    .then(loadingEl => {
      loadingEl.present();
      this.vacationsService.save(
        this.idPerson, this.fechaInicial, this.fechaIngresoFormat, this.diasPendientes, this.listDaysDefault
      ).subscribe((res: Response ) => {
        
        const key = 'data';
        this.diasPendientes = res[key].diasPendientes;

        if (res[key].mensajes !== 'undefined') {
          const mensajes: string[] = res[key].mensajes;

          if ( mensajes != null && mensajes.length > 0) {

            this.utilsMessage.messageParamethersArray(res[key].mensajes, 'Vacaciones', 'Registro de vacaciones');

            loadingEl.dismiss();

          } else {

            loadingEl.dismiss();
            this.listDaysDefault = res[key].listaDias;
            this.buttonsRefresh(res);
            this.utilsMessage.messageOkTemp(this.utilsMessage.messageOk(), '', '');
          }

        } else {
          loadingEl.dismiss();
          this.listDaysDefault = res[key].listaDias;
          this.buttonsRefresh(res);
          this.utilsMessage.messageOkTemp(this.utilsMessage.messageOk(), '', '');
        }
      },
      (err) => {
        loadingEl.dismiss();
        this.utilsMessage.messageApiError(err, 'VacationsPage', 'impress()');
        this.utilsNavigate.routerNavigateVacations();
      });
    });

  }

  removeItem(id: number): void {
    let i = 0;
    for ( i; i < this.listDaysDefault.length; i++ ) {
      if (this.listDaysDefault[i].idVacaciones === id) {
        this.listDaysDefault.splice(i, 1);
      }
    }
  }

  update(): void {
    this.utilsNavigate.routerNavigateVacationsUpdate();
  }

  cancel(): void {
    this.utilsNavigate.routerNavigateVacationsCancel();
  }

  impressUpdate(): void {
    alert('Trabajando este modulo...');
  }

  changeToggle() {
    return this.periodoEscalonado;
  }

  refresh(): void {
    this.vacationsInit();
  }

}

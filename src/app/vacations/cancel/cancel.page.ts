import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { VacationsService } from '../../services/vacations.service';
import { GlobalService } from '../../services/global.service';
import { UtilsMessage } from '../../utils/utils.message';
import { UtilsNavigate } from '../../utils/utils.navigate';
import { UtilsHidden } from '../../utils/utils.hidden';
import { Constants as CONST } from '../../config/config.const';
@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.page.html',
  styleUrls: ['./cancel.page.scss'],
})
export class CancelPage {
  listDaysDefault: any = [];
  checked: any = [];
  visible: boolean;
  btnModificar: any;
  btnImprimir: any;
  b64Data: any;
  diasDisponibles: any;
  diasPendientes: any;
  fechaInicial: any;
  fechaFinalFormat: any;
  fechaIngresoFormat: any;
  fechaInicialFormat: any;
  txtMotivo: any;
  visibleButton: any = false;
  nav: any;
  diasCorresponden: any;
  mensajeDependecy: any;
  statusDependecy: any;
  periodo: boolean;
  constructor(
    private vacationsService: VacationsService,
    private loadingCtrl: LoadingController,
    private globalService: GlobalService,
    private utilsMessage: UtilsMessage,
    private utilsNavigate: UtilsNavigate,
    private utilsHidden: UtilsHidden,
  ) {}
  ionViewWillEnter() {
    this.cancelInit();
  }
  cancelInit(): void {
    const id = this.globalService.personId();
    const date = this.globalService.date();
    this.loadingCtrl
    .create({
      keyboardClose: true,
      spinner: null,
      message: CONST.LOADER_GIF,
      cssClass: 'custom-loader-class'
    })
    .then(loadingEl => {
      loadingEl.present();
      this.vacationsService.cancel(id, date).subscribe( (res: Response ) => {
        const key = 'data';
        this.diasDisponibles      = res[key].diasDisponibles;
        this.diasCorresponden     = res[key].diasCorresponden;
        this.diasPendientes       = res[key].diasPendientes;
        this.fechaInicial         = res[key].fechaInicialFormat;
        this.fechaFinalFormat     = res[key].fechaFinalFormat;
        this.fechaIngresoFormat   = res[key].periodoEmpleado.fechaIngresoFormat;
        this.listDaysDefault      = res[key].listaDias;
        this.buttonsRefresh(res);
        if (this.listDaysDefault.length === 0 ) {
          this.utilsMessage.messageListVoid();
        }
        this.statusDependecy = this.dependent(res[key].periodoVacacional);
        if (this.statusDependecy === true) {
          this.mensajeDependecy = res[key].periodoEmpleado.dependencia.dependencia;
        } else {
          this.mensajeDependecy = null;
        }
        this.visible = this.utilsHidden.visibleContent();
        loadingEl.dismiss();
      },
      (err) => {
        loadingEl.dismiss();
        this.utilsMessage.messageApiError(err, 'Vacaciones', 'Cancelación');
        this.utilsNavigate.routerNavigateVacationsUpdate();
      });
    });
  }
  dependent(status: any) {
    if (status === 'PENDIENTE_OTRA_DEPENDENCIA') {
      return this.periodo = true;
    } else {
      return this.periodo = false;
    }
  }
  saveCancel() {
    const modifiedList = [];
    if (this.checked != null && this.checked.length > 0) {
      let i = 0;
      for (i; i < this.checked.length; i++) {
        let j = 0;
        for (j; j < this.listDaysDefault.length; j++) {
          if (this.checked[i].toString() === this.listDaysDefault[j].idVacaciones.toString() ) {
            modifiedList.push(this.listDaysDefault[j]);
          }
        }
      }
      const getPersonId = this.globalService.personId();
      const getFechaUltimoPeriodo = this.globalService.date();
      const data = {
          personId: getPersonId,
          fechaUltimoPeriodo: getFechaUltimoPeriodo,
          diasVacaciones: modifiedList
      };
      this.sendCancel(data);
    } else {
      this.utilsMessage.messageGeneric(this.utilsMessage.messageSelectList(), 'Vacaciones', 'Cancelación');
    }
    /***************************************************/
    this.visibleButton = false;
  }
  buttonsRefresh(res: any): void {
    const key = 'data';
    this.btnModificar = res[key].botonModificar;
    this.btnImprimir  = res[key].botonImprimir;
  }
  sendCancel(data: any) {
    this.loadingCtrl
    .create({
      keyboardClose: true,
      spinner: null,
      message: CONST.LOADER_GIF,
      cssClass: 'custom-loader-class'
    })
    .then(loadingEl => {
      loadingEl.present();
      this.vacationsService.commitCancel(data).subscribe((res: Response) => {
        const key = 'data';
        if (res[key].listaDias !== 'undefined') {
          this.concatenate(res, key);
          const nuevaListaModificados = res[key].listaDias;
          if (nuevaListaModificados != null && nuevaListaModificados.length > 0) {
            this.listDaysDefault = nuevaListaModificados;
            this.buttonsRefresh(res);
            loadingEl.dismiss();
            this.utilsMessage.messageOkTemp(this.utilsMessage.messageOk(), '', '');
          }
        }
        if (res[key].mensajes !== 'undefined') {
          const mensajes: string[] = res[key].mensajes;
          if (mensajes != null && mensajes.length > 0) {
            this.utilsMessage.messageParamethersArray(mensajes, 'Vacaciones', 'Cancelación');
            loadingEl.dismiss();
          }
        }
      },
      (err) => {
          this.utilsMessage.messageApiError(err, 'Vacaciones', 'Cancelación');
          loadingEl.dismiss();
      });
    });
  }
  concatenate(res: any, key: string): void {
    let i = 0;
    let concatenate = '';
    for (i; i < this.listDaysDefault.length; i++) {
      concatenate = res[key].listaDias[i].fechaFormat + ' ' + res[key].listaDias[i].estatusDescripcion;
      res[key].listaDias[i].fecha = concatenate;
    }
  }
  addCheckbox(event: any, idVacaciones: string) {
    this.visibleButton = true;
    const datetime = document.getElementById(idVacaciones);
    if (event.target.checked) {
      this.checked.push(idVacaciones);
      this.enabledDatetime(datetime);
    } else {
      const index = this.removeCheckedFromArray(idVacaciones);
      this.checked.splice(index, 1);
      this.disabledDatetime(datetime);
    }
  }
  removeCheckedFromArray(checkbox: string) {
    return this.checked.findIndex((category: any) => {
      return category === checkbox;
    });
  }
  enabledDatetime(datetime: any): void {
    datetime.classList.remove('disabled');
    datetime.classList.add('enabled');
  }
  disabledDatetime(datetime: any): void {
    datetime.classList.remove('enabled');
    datetime.classList.add('disabled');
  }
  back(): void {
    this.utilsNavigate.routerNavigateVacations();
  }
  refresh() {
    this.cancelInit();
    this.visibleButton = false;
  }
  impress() {
    const modifiedList = [];
    let i = 0;
    for (i; i < this.listDaysDefault.length; i++) {
      if (this.listDaysDefault[i].estatusFormat === 'PC') {
        modifiedList.push(this.listDaysDefault[i]);
      }
    }
    if (modifiedList.length > 0) {
      const data = {
        personId: this.globalService.personId(),
        motivo: this.txtMotivo,
        diasDisponibles: this.diasDisponibles,
        listaVacaciones: modifiedList
      };
      this.loadingCtrl
      .create({
        keyboardClose: true,
        spinner: null,
        message: CONST.LOADER_GIF,
        cssClass: 'custom-loader-class'
      })
      .then(loadingEl => {
        loadingEl.present();
        this.vacationsService.downloadCancel(data).subscribe( (res: {} ) => {
          const key = 'data';
          const nameFile = res[key].nombreArchivo;
          this.b64Data = res[key].archivoBase64;
          this.download(this.b64Data, nameFile);
          loadingEl.dismiss();
        },
        (err) => {
          alert(JSON.stringify(err));
          loadingEl.dismiss();
        });
      });

    } else {
      this.utilsMessage.messageGeneric(this.utilsMessage.messageListVoid(), 'Vacaciones', 'Cancelación');
    }
  }
  download(b64Data: string, nameFile: string): void {
    this.globalService.b64toBlobPdf(b64Data, nameFile,  CONST.APPLICATION_PDF, CONST.SIZE_BUFFER);
  }
  onClick(): void {
    const select = document.getElementById('notifications');
    select.click();
  }
}

import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { VacationsService } from '../../services/vacations.service';
import { GlobalService } from '../../services/global.service';
import { UtilsMessage } from '../../utils/utils.message';
import { UtilsNavigate } from '../../utils/utils.navigate';
import { UtilsHidden } from '../../utils/utils.hidden';
import { Constants as CONST } from '../../config/config.const';
import * as moment from 'moment';
@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage {
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
  modifiedList = [];
  visibleButton: any = false;
  diasCorresponden: any;
  mensajeDependecy: any;
  statusDependecy: any;
  periodo: boolean;
  estatusDescripcion: any;
  
  constructor(
    private vacationsService: VacationsService,
    private loadingCtrl: LoadingController,
    private globalService: GlobalService,
    private utilsMessage: UtilsMessage,
    private utilsNavigate: UtilsNavigate,
    private utilsHidden: UtilsHidden
  ) {}
  ionViewWillEnter() {
    this.updateInit();
  }
  updateInit(): void {
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
      this.vacationsService.update(id, date).subscribe( (res: Response ) => {
        const key = 'data';
        this.diasDisponibles      = res[key].diasDisponibles;
        this.diasCorresponden     = res[key].diasCorresponden;
        this.diasPendientes       = res[key].diasPendientes;
        this.fechaInicial         = res[key].fechaInicialFormat;
        this.fechaFinalFormat     = res[key].fechaFinalFormat;
        this.fechaIngresoFormat   = res[key].periodoEmpleado.fechaIngresoFormat;
        this.estatusDescripcion   = res[key].estatusDescripcion;
        this.listDaysDefault = res[key].listaDias;
        this.cloneArray(res[key].listaDias);
        //this.concatenate(res, key);
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
        this.utilsMessage.messageApiError(err, 'UpdatePage', 'updateInit()');
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
  buttonsRefresh(res: any): void {
    const key = 'data';
    this.btnModificar = res[key].botonModificar;
    this.btnImprimir = res[key].botonImprimir;
  }
  saveUpdate() {
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

      this.sendUpdate(data);

    } else {
      this.utilsMessage.messageGeneric(this.utilsMessage.messageSelectList(), 'Vacaciones', null);
    }
    /***************************************************/
    this.visibleButton = false;
  }
  sendUpdate(data: any) {
    this.loadingCtrl
    .create({
      keyboardClose: true,
      spinner: null,
      message: CONST.LOADER_GIF,
      cssClass: 'custom-loader-class'
    })
    .then(loadingEl => {
      loadingEl.present();
      this.vacationsService.commitUpdate(data).subscribe((res: Response) => {
        const key = 'data';
        if (res[key].listaDias !== 'undefined') {

          const nuevaListaModificados = res[key].listaDias;

          if (nuevaListaModificados != null && nuevaListaModificados.length > 0) {
            this.listDaysDefault = nuevaListaModificados;
            this.buttonsRefresh(res);
            loadingEl.dismiss();
            this.utilsMessage.messageOkTemp(this.utilsMessage.messageOk(), null, null);

          }


        }
        if (res[key].mensajes !== 'undefined') {
          const mensajes: string[] = res[key].mensajes;
          if (mensajes != null && mensajes.length > 0) {
            this.utilsMessage.messageParamethersArray(mensajes, 'Vacaciones', 'Modificación de fechas');
            loadingEl.dismiss();
          }
        }
      },
      (err) => {
          this.utilsMessage.messageApiError(err, 'Vacaciones', 'Modificación de fechas');
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
  dataFromList(idVacaciones: any, formBuilder: any) {
    const obj = formBuilder.value;
    if (obj !== 'undefined' && obj != null) {
      const array = Object.entries(obj);
      let date = '';
      const position = this.indexOf(idVacaciones);
      date = this.indexOfDate(idVacaciones, array);
      if (date != null && date.length > 0) {
        this.listDaysDefault[position].fechaFormat = date;
        this.visibleButton = true;
      }
    }
  }
  indexOf(id: number) {
    for (let i = 0; i < this.listDaysDefault.length; i++) {
      if ( id === this.listDaysDefault[i].idVacaciones ) {
        return i;
      }
    }
    return -1;
  }
  indexOfDate(id: string, array: any) {
    let date = '';
    let i = 0;
    for (i; i < array.length; i++) {
      if ( id.toString() === array[i][0] ) {
        date =  moment(array[i][1]).format(CONST.FORMAT_DATE [0]);
        return date;
      }
    }
    return null;
  }
  addCheckbox(event: any, idVacaciones: string) {
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
  enabledDatetime(datetime: any) {
    datetime.classList.remove('disabled');
    datetime.classList.add('enabled');
  }
  disabledDatetime(datetime: any) {
    datetime.classList.remove('enabled');
    datetime.classList.add('disabled');
  }
  back() {
    return this.utilsNavigate.routerNavigateVacations();
  }
  refresh(): void {
    this.updateInit();
  }
  download(b64Data: string, nameFile: string): void {
    console.log(nameFile);
    console.log(b64Data);
    this.globalService.b64toBlobPdf(b64Data, nameFile,  CONST.APPLICATION_PDF, CONST.SIZE_BUFFER);
  }
  impress(): void {
    if (this.modifiedList.length > 0) {
      const data = {
        personId: this.globalService.personId(),
        diasDisponibles: this.diasDisponibles,
        listaVacaciones: this.modifiedList
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
        this.vacationsService.downloadUpdate(data).subscribe( (res: {} ) => {
          const key = 'data';
          const nameFile = res[key].nombreArchivo;
          this.b64Data = res[key].archivoBase64;
          this.download(this.b64Data, nameFile);
          loadingEl.dismiss();
        },
        (err) => {
          this.utilsMessage.messageApiError(err, 'Vacaciones', 'Descarga');
          loadingEl.dismiss();
        });
      });
    } else {
      this.utilsMessage.messageGeneric(this.utilsMessage.messageListVoid(), 'Vacaciones', 'Descarga');
    }
  }
  cloneArray(listVacations: any): void {
    let i = 0;
    if (listVacations != null && listVacations.length > 0) {
      for (i; i < listVacations.length; i++) {
        if (listVacations[i].estatusFormat === 'PM' ) {
          const obj = {
            idVacaciones : listVacations[i].idVacaciones,
            personId: listVacations[i].personId,
            fechaFormat: listVacations[i].fechaFormat,
            estatusFormat: listVacations[i].estatusFormat
          };
          console.log(listVacations[i]);
          this.modifiedList.push(obj);
        }
      }
    }
  }
  onClick(): void {
    const select = document.getElementById('notifications');
    select.click();
  }
}

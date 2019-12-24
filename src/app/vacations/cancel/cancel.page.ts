import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { UtilsMessage } from '../../utils/utils.message';
import { VacationsService } from '../../services/vacations.service';
import { GlobalService } from '../../services/global.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Constants as CONST } from '../../config/config.const';
import * as moment from 'moment';
@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.page.html',
  styleUrls: ['./cancel.page.scss'],
})
export class CancelPage implements OnInit {

  listDaysDefault: any = [];
  listDaysGenerate: any = [];
  date: any = false;
  visible: any = false;
  checked = [];
  myArray = [];
  b64Data: any;

  constructor(
    private alertCtrl: AlertController,
    private utilsMessage: UtilsMessage,
    private vacationsService: VacationsService,
    private loadingCtrl: LoadingController,
    private globalService: GlobalService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.cancel();
  }

  refresh() {
    window.location.reload();
  }

  cancel(): void {
    const id = this.globalService.personId();
    const date = this.globalService.date();
    this.loadingCtrl
    .create({ keyboardClose: true, message: 'Cargando datos...' })
    .then(loadingEl => {
      loadingEl.present();
      this.vacationsService.cancel(id, date).subscribe( (res: Response ) => {
        this.listDaysDefault = res['data'].listaDias;
        if (this.listDaysDefault.length === 0 ) {
          this.utilsMessage.alertListVoidVacations();
        }
        console.log(this.listDaysDefault);
        this.visible = true;
        loadingEl.dismiss();
      },
      (err) => {
        console.log(err);
        loadingEl.dismiss();
        this.utilsMessage.alertVacations();
        this.utilsMessage.routerNavigateVacationsCancel();
      });
    });
  }

  submitForm(formBuilder: any) {
    const obj = formBuilder.value;
    const array = Object.entries(obj);
    let k = 0;
    let id = '';
    let date = '';
    for (k; k < array.length; k++ ) {
      id = array[k][0];
      date =  moment(array[k][1]).format('DD/MM/YYYY');
      if (date === 'Invalid date') {
      } else {
        let i = 0;
        let idVacaciones = 0;
        let fechaFormat = '';
        let estatusFormat = '';
        let personId = '';
        const newRegister = {
          idVacaciones: null,
          personId: null,
          fechaFormat: null,
          estatusFormat: null
        };
        for (i; i < this.listDaysDefault.length; i++ ) {
          idVacaciones = this.listDaysDefault[i].idVacaciones;
          fechaFormat = this.listDaysDefault[i].fechaFormat;
          estatusFormat = this.listDaysDefault[i].estatusFormat;
          personId =  this.listDaysDefault[i].personId;
          if (idVacaciones.toString() === id) {
            console.log('AFTER: ' + idVacaciones + ' ' + fechaFormat + '-------------' + 'NOW: ' + id + ' ' + date);
            newRegister.idVacaciones       = idVacaciones;
            newRegister.personId           = personId;
            newRegister.fechaFormat        = date;
            newRegister.estatusFormat      = estatusFormat;
            this.listDaysGenerate.push(newRegister);
          }
        }
      }
    }
    const getPersonId = this.globalService.personId();
    const getFechaUltimoPeriodo = this.globalService.date();
    const sendVacations = {
        personId: getPersonId,
        fechaUltimoPeriodo: getFechaUltimoPeriodo,
        diasVacaciones: this.listDaysGenerate
    };

    this.send(sendVacations);

  }

  send(sendVacations: any) {
    if (sendVacations.diasVacaciones <= 0) {
      this.utilsMessage.alertDaysVoid();
    } else {

      this.utilsMessage.alertCommitCancel(sendVacations);

    }
  }

  enabledControl(element) {
    element.classList.remove('disabled');
    element.classList.add('enabled');
  }

  disabledControl(element) {
    element.classList.remove('enabled');
    element.classList.add('disabled');
  }

  addCheckbox(event, item: any, idVacaciones: string) {
    console.log(JSON.stringify(event));
    const element = document.getElementById(idVacaciones);
    if (event.target.checked) {
      this.enabledControl(element);
      console.log(idVacaciones);
      console.log(item);
    } else {

      this.disabledControl(element);
      console.log(this.listDaysGenerate);
    }
    /*
    if ( event.target.checked ) {
      this.checked.push(checkbox);
    } else {
      const index = this.removeCheckedFromArray(checkbox);
      this.checked.splice(index, 1);
    }
    console.log(JSON.stringify(this.checked));
    */
  }

  removeCheckedFromArray(checkbox: string) {
    return this.checked.findIndex((category) => {
      return category === checkbox;
    });
  }

  emptyCheckedArray() {
    this.checked = [];
  }
  downloadCancelCall(b64Data: string, nameFile: string): void {
    this.globalService.b64toBlobPdf(b64Data, nameFile,  CONST.APPLICATION_PDF, CONST.SIZE_BUFFER);
  }
  downloadCancel() {    
    const sendVacations = {
      personId: 283597,
      diasDisponibles: 32,
      motivo: 'Por órdenes del oficial mayor se tuvo que trabajar',
      listaVacaciones: 
      [
        {
          idVacaciones: 2567,
          personId: 283597,
          fechaFormat: '17/12/2019',
          estatusFormat: 'PC'
        }
      ]
    };
    this.loadingCtrl
    .create({ keyboardClose: true, message: 'Descargando datos...' })
    .then(loadingEl => {
      loadingEl.present();        
      this.vacationsService.downloadCancel(sendVacations).subscribe( (res: Response ) => {
        const nameFile = res['data'].nombreArchivo;
        this.b64Data = res['data'].archivoBase64;
        this.downloadCancelCall(this.b64Data, nameFile);
        loadingEl.dismiss();
      },
      (err) => {
        alert(JSON.stringify(err));
        loadingEl.dismiss();
      });
    });
  }  

  back() {
    return this.utilsMessage.routerNavigateVacations();
  }

}
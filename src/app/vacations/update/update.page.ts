import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { UtilsMessage } from '../../utils/utils.message';
import { VacationsService } from '../../services/vacations.service';
import { GlobalService } from '../../services/global.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {

  listDaysDefault: any = [];
  listDaysGenerate: any = [];
  date: any = false;
  visible: any = false;
  checked = [];
  myArray = [];

  constructor(
    private utilsMessage: UtilsMessage,
    private vacationsService: VacationsService,
    private loadingCtrl: LoadingController,
    private globalService: GlobalService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.update();
  }

  refresh() {
    this.update();
  }

  update(): void {
    const id = this.globalService.personId();
    const date = this.globalService.date();
    this.loadingCtrl
    .create({ keyboardClose: true, message: 'Cargando datos...' })
    .then(loadingEl => {
      loadingEl.present();
      this.vacationsService.update(id, date).subscribe( (res: Response ) => {
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
        this.utilsMessage.routerNavigateVacationsUpdate();
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
        const nodo = {
          idVacaciones: String,
          personId: String,
          fecha: '',
          fechaFormat: String,
          estatus: String,
          estatusFormat: String,
          estatusDescripcion: String,
          fechaRegistro: String
        };
        for (i; i < this.listDaysDefault.length; i++ ) {
          idVacaciones = this.listDaysDefault[i].idVacaciones;
          fechaFormat = this.listDaysDefault[i].fechaFormat;
          if (idVacaciones.toString() === id) {
            console.log('AFTER: ' + idVacaciones + ' ' + fechaFormat);
            console.log('NOW: ' + id + ' ' + date);
            nodo.idVacaciones       = this.listDaysDefault[i].idVacaciones;
            nodo.personId           = this.listDaysDefault[i].personId;
            nodo.fecha              = date;
            nodo.fechaFormat        = this.listDaysDefault[i].fechaFormat;
            nodo.estatusDescripcion = this.listDaysDefault[i].estatusDescripcion;
            nodo.fechaRegistro      = this.listDaysDefault[i].fechaRegistro;
            this.listDaysGenerate.push(nodo);
          }
        }
      }
    }

    console.log(JSON.stringify(this.listDaysGenerate));

  }


  addCheckbox(event, checkbox: string) {

    console.log(JSON.stringify(checkbox));

    if ( event.target.checked ) {
      this.checked.push(checkbox);
    } else {
      const index = this.removeCheckedFromArray(checkbox);
      this.checked.splice(index, 1);
    }


    console.log(JSON.stringify(this.checked));
  }

  removeCheckedFromArray(checkbox: string) {
    return this.checked.findIndex((category) => {
      return category === checkbox;
    });
  }

  emptyCheckedArray() {
    this.checked = [];
  }

  back() {
    return this.utilsMessage.routerNavigateVacations();
  }

}

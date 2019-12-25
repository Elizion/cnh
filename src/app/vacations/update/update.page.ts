import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { VacationsService } from '../../services/vacations.service';
import { GlobalService } from '../../services/global.service';
import { UtilsMessage } from '../../utils/utils.message';
import { UtilsNavigate } from '../../utils/utils.navigate';
import { UtilsHidden } from '../../utils/utils.hidden';
import * as moment from 'moment';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})

export class UpdatePage implements OnInit {

  listDaysDefault: any = [];
  checked = [];
  visible: boolean;

  constructor(
    private vacationsService: VacationsService,
    private loadingCtrl: LoadingController,
    private globalService: GlobalService,
    private utilsMessage: UtilsMessage,
    private utilsNavigate: UtilsNavigate,
    private utilsHidden: UtilsHidden
  ) {}

  ngOnInit() {
    this.updateList();
  }

  refresh() {
    window.location.reload();
  }

  updateList(): void {

    const id = this.globalService.personId();
    const date = this.globalService.date();
    this.loadingCtrl
    .create({ keyboardClose: true, message: this.utilsMessage.messageCharging() })
    .then(loadingEl => {
      loadingEl.present();
      this.vacationsService.update(id, date).subscribe( (res: Response ) => {
        const key = 'data';
        this.listDaysDefault = res[key].listaDias;
        if (this.listDaysDefault.length === 0 ) {
          this.utilsMessage.messageListVoid();
        }
        this.visible = this.utilsHidden.visibleContent();
        loadingEl.dismiss();
      },
      (err) => {
        console.log(err);
        loadingEl.dismiss();
        this.utilsMessage.messageApiError(err, 'UpdatePage', 'updateInit()');
        this.utilsNavigate.routerNavigateVacationsUpdate();
      });
    });

  }

  submitForm() {
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
      console.log(modifiedList);
    } else {
      alert('Mensaje de alerta');
    }
  }

  dataFromList(event: any, idVacaciones: any, formBuilder: any) {
    const obj = formBuilder.value;
    const array = Object.entries(obj);
    let date = '';
    const position = this.indexOf(idVacaciones);
    date = this.indexOfDate(idVacaciones, array);
    this.listDaysDefault[position].fechaFormat = date;
  }

  addCheckbox(event: any, idVacaciones: string) {
    //CHECKBOX False(SI EDITAR) CON ESTATUS 'A'
    //CHECKBOX render (false) CON ESTATUS 'PM'
    if (event.target.checked) {
      this.checked.push(idVacaciones);
    } else {
      const index = this.removeCheckedFromArray(idVacaciones);
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
        date =  moment(array[i][1]).format('DD/MM/YYYY');
        return date;
      }
    }
    return null;
  }

}

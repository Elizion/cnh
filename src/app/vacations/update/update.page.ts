import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { UtilsMessage } from '../../utils/utils.message';
import { VacationsService } from '../../services/vacations.service';
import { GlobalService } from '../../services/global.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
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
  constructor(
    private utilsMessage: UtilsMessage,
    private vacationsService: VacationsService,
    private loadingCtrl: LoadingController,
    private globalService: GlobalService
  ) {}

  ngOnInit() {
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
  addCheckbox(event, checkbox: string) {
    if ( event.target.checked ) {
      this.checked.push(checkbox);
    } else {
      const index = this.removeCheckedFromArray(checkbox);
      this.checked.splice(index, 1);
    }
  }
  removeCheckedFromArray(checkbox: string) {
    return this.checked.findIndex((category) => {
      return category === checkbox;
    });
  }
  emptyCheckedArray() {
    this.checked = [];
  }
  getCheckedBoxes() {
    alert(JSON.stringify(this.checked));
  }
  back() {
    return this.utilsMessage.routerNavigateVacations();
  }
}

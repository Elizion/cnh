import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { UtilsMessage } from '../../utils/utils.message';
import { VacationsService } from '../../services/vacations.service';
import { GlobalService } from '../../services/global.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ValueTransformer } from '@angular/compiler/src/util';
@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {

  form: FormGroup;
  Data: Array<any> = [
    { name: 'Pear', value: 'pear' },
    { name: 'Plum', value: 'plum' },
    { name: 'Kiwi', value: 'kiwi' },
    { name: 'Apple', value: 'apple' },
    { name: 'Lime', value: 'lime' }
  ];


  constructor(
    private utilsMessage: UtilsMessage,
    private vacationsService: VacationsService,
    private loadingCtrl: LoadingController,
    private globalService: GlobalService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      checkArray: this.fb.array([], [Validators.required])
    });
  }

  listDaysDefault: any = [];
  listDaysGenerate: any = [];
  date: any = false;
  visible: any = false;

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

  onCheckboxChange(e) {
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;

    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  submitForm() {
    alert(JSON.stringify(this.form.value));
  }



  back() {
    return this.utilsMessage.routerNavigateVacations();
  }

}

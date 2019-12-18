import { Component, OnInit } from '@angular/core';
import { UtilsMessage } from '../../utils/utils.message';
import { VacationsService } from '../../services/vacations.service';
import { GlobalService } from '../../services/global.service';
@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {

  constructor(
    private utilsMessage: UtilsMessage,
    private vacationsService: VacationsService,
    private globalService: GlobalService
  ) { }

  ngOnInit() {
    this.update();
  }


  update() {

    const id = this.globalService.personId();
    const date = this.globalService.date();

    this.vacationsService.update(id, date).subscribe((res) => {
      console.log('##################');
      console.log(JSON.stringify(res));
    },
    (err) => {

      return this.utilsMessage.routerNavigateVacationsUpdate();
    });

  }

  back() {
    return this.utilsMessage.routerNavigateVacations();
  }

}

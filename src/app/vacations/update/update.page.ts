import { Component, OnInit } from '@angular/core';
import { UtilsMessage } from '../../utils/utils.message';
@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {

  constructor(
    private utilsMessage: UtilsMessage
  ) { }

  ngOnInit() {
  }

  back() {
    return this.utilsMessage.routerNavigateVacations();
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../services/global.service';
import { LoadingController } from '@ionic/angular';
import { LicensesService } from '../../services/licenses.service';
import { UtilsMessage } from '../../utils/utils.message';
import { UtilsNavigate } from '../../utils/utils.navigate';
import { UtilsHidden } from '../../utils/utils.hidden';
import { Constants as CONST } from '../../config/config.const';
@Component({
  selector: 'app-licenses-detail',
  templateUrl: './licenses-detail.page.html',
  styleUrls: ['./licenses-detail.page.scss'],
})
export class LicensesDetailPage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private globalService: GlobalService,
    private loadingCtrl: LoadingController,
    private licenseService: LicensesService,
    private utilsMessage: UtilsMessage,
    private utilsNavigate: UtilsNavigate,
    private utilsHidden: UtilsHidden
  ) { }

  idPerson = this.globalService.personId();

  id: string;

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('daysWithPay');
    console.log(this.id + ' ' + this.idPerson);

  }



}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../services/global.service';
@Component({
  selector: 'app-licenses-detail',
  templateUrl: './licenses-detail.page.html',
  styleUrls: ['./licenses-detail.page.scss'],
})
export class LicensesDetailPage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private globalService: GlobalService
  ) { }

  idPerson = this.globalService.personId();

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('daysWithPay');
    alert(id + ' ' + this.idPerson);
  }

}

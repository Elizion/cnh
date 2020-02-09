import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-licenses-detail',
  templateUrl: './licenses-detail.page.html',
  styleUrls: ['./licenses-detail.page.scss'],
})
export class LicensesDetailPage implements OnInit {
  constructor(
    private route: ActivatedRoute,
  ) { }
  keyIssste: any;
  startDate: any;
  endDate: any;
  receptionDate: any;
  diagnostico: any;
  riesgoTrabajo: any;
  anniversaryYear: any;
  diasConGoce: any;
  diasMedioGoce: any;
  diasSinGoce: any;
  ngOnInit() {
    const keyIssste = this.route.snapshot.paramMap.get('keyIssste');
    const startDate = this.route.snapshot.paramMap.get('startDate');
    const endDate = this.route.snapshot.paramMap.get('endDate');
    const receptionDate = this.route.snapshot.paramMap.get('receptionDate');
    const diagnostico = this.route.snapshot.paramMap.get('diagnostico');
    const riesgoTrabajo = this.route.snapshot.paramMap.get('riesgoTrabajo');
    const anniversaryYear = this.route.snapshot.paramMap.get('anniversaryYear');
    const diasConGoce = this.route.snapshot.paramMap.get('diasConGoce');
    const diasMedioGoce = this.route.snapshot.paramMap.get('diasMedioGoce');
    const diasSinGoce = this.route.snapshot.paramMap.get('diasSinGoce');
    this.keyIssste = keyIssste;
    this.startDate = startDate;
    this.endDate = endDate;
    this.receptionDate = receptionDate;
    this.diagnostico = diagnostico;
    this.riesgoTrabajo = riesgoTrabajo;
    this.anniversaryYear = anniversaryYear;
    this.diasConGoce = diasConGoce;
    this.diasMedioGoce = diasMedioGoce;
    this.diasSinGoce = diasSinGoce;
    /*
    console.log(this.keyIssste);
    console.log(this.startDate);
    console.log(this.endDate);
    console.log(this.receptionDate);
    console.log(this.diagnostico);
    console.log(this.riesgoTrabajo);
    console.log(this.anniversaryYear);
    console.log(this.diasConGoce);
    console.log(this.diasMedioGoce);
    console.log(this.diasSinGoce);
    */
  }
}

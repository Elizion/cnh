import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-general-detail',
  templateUrl: './general-detail.page.html',
  styleUrls: ['./general-detail.page.scss'],
})
export class GeneralDetailPage implements OnInit {

  description: any;
  base64: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    const description = this.route.snapshot.paramMap.get('description');
    const base64 = this.route.snapshot.paramMap.get('base64');

    this.description = description;
    this.base64 = base64;

    console.log(this.description);
    console.log(this.base64);

  }

}

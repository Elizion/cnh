import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-general-detail',
  templateUrl: './general-detail.page.html',
  styleUrls: ['./general-detail.page.scss'],
})
export class GeneralDetailPage implements OnInit {

  id: any;
  description: any;
  base64: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('noticeId');
    const description = this.route.snapshot.paramMap.get('description');
    const base64 = this.route.snapshot.paramMap.get('base64');

    this.id = id;
    this.description = description;
    this.base64 = base64;

    console.log(this.id);
    console.log(this.description);
    console.log(this.base64);

  }

}

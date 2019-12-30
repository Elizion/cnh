import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-personal-detail',
  templateUrl: './personal-detail.page.html',
  styleUrls: ['./personal-detail.page.scss'],
})
export class PersonalDetailPage implements OnInit {
  id: any;
  nombreArchivo: any;
  mensaje: any;
  constructor(private route: ActivatedRoute) { }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('noticeId');
    const nombreArchivo = this.route.snapshot.paramMap.get('nombreArchivo');
    const mensaje = this.route.snapshot.paramMap.get('mensaje');
    this.id = id;
    this.nombreArchivo = nombreArchivo;
    this.mensaje = mensaje;
    console.log(this.id);
    console.log(this.nombreArchivo);
    console.log(this.mensaje);
  }

}

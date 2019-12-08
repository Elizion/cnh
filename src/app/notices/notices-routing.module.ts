import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoticesPage } from '../controllers/notices.page';

const routes: Routes = [
  {
    path: '',
    component: NoticesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoticesPageRoutingModule {}

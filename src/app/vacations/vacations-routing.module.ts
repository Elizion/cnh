import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VacationsPage } from './vacations.page';

const routes: Routes = [
  {
    path: '',
    component: VacationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VacationsPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VacationsPage } from './vacations.page';

const routes: Routes = [
  {
    path: '',
    component: VacationsPage
  },
  {
    path: 'update',
    loadChildren: './update/update.module#UpdatePageModule'
  },
  {
    path: 'cancel',
    loadChildren: './cancel/cancel.module#CancelPageModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VacationsPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LicensesPage } from './licenses.page';

const routes: Routes = [
  {
    path: '',
    component: LicensesPage
  },
  {
    path: 'licenses-detail/:keyIssste/:startDate/:endDate/:receptionDate/:diagnostico' +
    '/:riesgoTrabajo/:anniversaryYear/:diasConGoce/:diasMedioGoce/:diasSinGoce',
    loadChildren: () => import('./licenses-detail/licenses-detail.module').then( m => m.LicensesDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LicensesPageRoutingModule {}

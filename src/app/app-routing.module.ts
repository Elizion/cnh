import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  { path: 'auth',
    loadChildren: './auth/auth.module#AuthPageModule'
  },
  {
    path: 'profile',
    loadChildren: './profile/profile.module#ProfilePageModule'
  },
  {
    path: 'notices',
    loadChildren: './notices/notices.module#NoticesPageModule'
  },
  {
    path: 'payroll',
    loadChildren: './payroll/payroll.module#PayrollPageModule'
  },
  {
    path: 'vacations',
    loadChildren: './vacations/vacations.module#VacationsPageModule'
  },
  {
    path: 'licenses',
    loadChildren: './licenses/licenses.module#LicensesPageModule'
  },  {
    path: 'licenses',
    loadChildren: () => import('./licenses/licenses.module').then( m => m.LicensesPageModule)
  }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

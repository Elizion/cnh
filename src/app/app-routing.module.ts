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
    path: 'places',
    loadChildren: './places/places.module#PlacesPageModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: './profile/profile.module#ProfilePageModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'notices',
    loadChildren: './notices/notices.module#NoticesPageModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'payroll',
    loadChildren: './payroll/payroll.module#PayrollPageModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'vacations',
    loadChildren: './vacations/vacations.module#VacationsPageModule',
    canLoad: [AuthGuard]
  }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

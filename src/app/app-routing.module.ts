import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'places', pathMatch: 'full' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule' },
  {
    path: 'places',
    loadChildren: './places/places.module#PlacesPageModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'bookings',
    loadChildren: './bookings/bookings.module#BookingsPageModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: './profile/profile.module#ProfeliPageModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

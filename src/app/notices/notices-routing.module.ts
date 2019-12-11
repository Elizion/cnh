import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoticesPage } from './notices.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: NoticesPage,
    children: [
      {
        path: 'personal',
        children: [
          {
            path: '',
            loadChildren: './personal/personal.module#PersonalPageModule'
          }
        ]
      },
      {
        path: 'general',
        children: [
          {
            path: '',
            loadChildren: './general/general.module#GeneralPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/notices/tabs/personal',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/notices/tabs/personal',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoticesPageRoutingModule {}

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
          },
          {
            path: ':noticeId',
            loadChildren: './personal/personal-detail/personal-detail.module#PersonalDetailPageModule'
          }
        ]
      },
      {
        path: 'general',
        children: [
          {
            path: '',
            loadChildren: './general/general.module#GeneralPageModule'
          },
          {
            path: ':noticeId/:description/:base64',
            loadChildren:
              './general/general-detail/general-detail.module#GeneralDetailPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/notices/tabs/general',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/notices/tabs/general',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoticesPageRoutingModule {}

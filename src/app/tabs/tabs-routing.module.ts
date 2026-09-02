// tabs-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'metrics',
        loadChildren: () => import('../metrics/metrics.module').then(m => m.MetricsPageModule)
      },
      {
        path: 'more',
        loadChildren: () => import('../more/more.module').then(m => m.MorePageModule)
      },
      {
        path: 'digital-literacy',
        loadChildren: () => import('./digital-literacy/digital-literacy.module').then(m => m.DigitalLiteracyPageModule)
      },
      {
        path: 'transportation',
        loadChildren: () => import('./transportation/transportation.module').then(m => m.TransportationPageModule)
      },
      {
        path: 'bursary-education',
        loadChildren: () => import('./bursary-education/bursary-education.module').then(m => m.BursaryEducationPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'meet-the-team',
    loadChildren: () => import('./meet-the-team/meet-the-team.module').then( m => m.MeetTheTeamPageModule)
  },
  {
    path: 'faq',
    loadChildren: () => import('./faq/faq.module').then( m => m.FaqPageModule)
  },
  {
    path: 'preferences',
    loadChildren: () => import('./preferences/preferences.module').then( m => m.PreferencesPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class TabsPageRoutingModule {}
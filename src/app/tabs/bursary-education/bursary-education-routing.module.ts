import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BursaryEducationPage } from './bursary-education.page';

const routes: Routes = [
  {
    path: '',
    component: BursaryEducationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BursaryEducationPageRoutingModule {}

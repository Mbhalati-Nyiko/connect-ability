import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DigitalLiteracyPage } from './digital-literacy.page';

const routes: Routes = [
  {
    path: '',
    component: DigitalLiteracyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DigitalLiteracyPageRoutingModule {}

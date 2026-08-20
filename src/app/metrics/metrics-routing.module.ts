import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetricsPage } from './metrics.page';

const routes: Routes = [
  {
    path: '',
    component: MetricsPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MetricsPageRoutingModule {}

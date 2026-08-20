import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MetricsPage } from './metrics.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { MetricsPageRoutingModule } from './metrics-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    MetricsPageRoutingModule
  ],
  declarations: [MetricsPage]
})
export class MetricsPageModule {}

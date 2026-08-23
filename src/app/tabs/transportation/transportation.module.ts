import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransportationPageRoutingModule } from './transportation-routing.module';

import { TransportationPage } from './transportation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransportationPageRoutingModule
  ],
  declarations: [TransportationPage]
})
export class TransportationPageModule {}

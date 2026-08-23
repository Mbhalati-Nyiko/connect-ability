import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DigitalLiteracyPageRoutingModule } from './digital-literacy-routing.module';

import { DigitalLiteracyPage } from './digital-literacy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DigitalLiteracyPageRoutingModule
  ],
  declarations: [DigitalLiteracyPage]
})
export class DigitalLiteracyPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BursaryEducationPageRoutingModule } from './bursary-education-routing.module';

import { BursaryEducationPage } from './bursary-education.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BursaryEducationPageRoutingModule
  ],
  declarations: [BursaryEducationPage]
})
export class BursaryEducationPageModule {}

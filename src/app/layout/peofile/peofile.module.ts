import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeofileRoutingModule } from './peofile-routing.module';
import { PeofileComponent } from './peofile.component';


@NgModule({
  declarations: [
    PeofileComponent
  ],
  imports: [
    CommonModule,
    PeofileRoutingModule
  ]
})
export class PeofileModule { }

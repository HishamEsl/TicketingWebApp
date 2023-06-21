import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientValidationRoutingModule } from './client-validation-routing.module';
import { ClientValidationComponent } from './client-validation.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ClientValidationComponent
  ],
  imports: [
    CommonModule,
    ClientValidationRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class ClientValidationModule { }

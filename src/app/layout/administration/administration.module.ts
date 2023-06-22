import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationComponent } from './administration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [AdministrationComponent],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class AdministrationModule {}

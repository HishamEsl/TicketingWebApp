import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsRoutingModule } from './tickets-routing.module';
import { TicketsComponent } from './tickets.component';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [TicketsComponent, TicketDetailsComponent],
  imports: [
    CommonModule,
    TicketsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
})
export class TicketsModule {}

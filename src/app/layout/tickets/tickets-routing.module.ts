import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeAdminGuard } from 'src/app/shared/guards/employee-admin.guard';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { TicketsComponent } from './tickets.component';

const routes: Routes = [
  { path: '', component: TicketsComponent },
  {
    path: 'details/:id',
    component: TicketDetailsComponent,
    // canActivate: [EmployeeAdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketsRoutingModule {}

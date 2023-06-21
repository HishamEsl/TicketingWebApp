import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../shared/guards/admin.guard';
import { ClientGuard } from '../shared/guards/client.guard';
import { EmployeeAdminGuard } from '../shared/guards/employee-admin.guard';

import { LayoutComponent } from './layout.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'tickets' },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      {
        path: 'dashboard',
        canActivate: [EmployeeAdminGuard],
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'teams',
        canActivate: [AdminGuard],
        loadChildren: () =>
          import('./teams/teams.module').then((m) => m.TeamsModule),
      },
      { path: 'accountOnHold', loadChildren: () => import('./client-validation/client-validation.module').then(m => m.ClientValidationModule) },
      {
        path: 'tickets',
        loadChildren: () =>
          import('./tickets/tickets.module').then((m) => m.TicketsModule),
        },
      {
        path: 'faqs',
        loadChildren: () => import('./faq/faq.module').then((m) => m.FaqModule),
      },
      {
        path: 'contactUs',
        canActivate: [ClientGuard],
        loadChildren: () =>
          import('./contact-us/contact-us.module').then(
            (m) => m.ContactUsModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./peofile/peofile.module').then((m) => m.PeofileModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}

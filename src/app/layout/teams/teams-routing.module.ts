import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberDetailsComponent } from './member-details/member-details.component';
import { TeamsComponent } from './teams.component';

const routes: Routes = [
  { path: '', component: TeamsComponent },
  { path: 'details/:id', component: MemberDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamsRoutingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamsRoutingModule } from './teams-routing.module';
import { TeamsComponent } from './teams.component';
import { MemberDetailsComponent } from './member-details/member-details.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    TeamsComponent,
    MemberDetailsComponent
  ],
  imports: [
    CommonModule,
    TeamsRoutingModule,
    SharedModule
  ]
})
export class TeamsModule { }

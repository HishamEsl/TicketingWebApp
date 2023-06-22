import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ProjectsComponent],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    
  ],
})
export class ProjectsModule {}

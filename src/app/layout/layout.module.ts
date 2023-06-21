import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LayoutComponent, SidebarComponent, TopbarComponent,],
  imports: [CommonModule, LayoutRoutingModule, SharedModule],
})
export class LayoutModule {}

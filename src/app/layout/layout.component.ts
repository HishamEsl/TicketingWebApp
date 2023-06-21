import { Component, OnInit, ViewChild } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  @ViewChild(SidebarComponent) sidebar: SidebarComponent | undefined;
  isCollapsed = false;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  
  constructor() { }

  ngOnInit(): void {

    
  }

}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  user = this._authservice.userSubject.value;
  role: any = sessionStorage.getItem('RL');



  constructor(private _authservice: AuthService) {}

  ngOnInit(): void {}

  userLogOut() {
    this._authservice.logout();
  }
}

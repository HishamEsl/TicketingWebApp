import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmployee } from 'src/app/shared/models/employee.model';
import { IUser } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TicketService } from 'src/app/shared/services/ticket.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  userId: any = sessionStorage.getItem('UID');
  user$!: Observable<IEmployee[]>;


  @Output() collapseToggle = new EventEmitter<void>();
  emitCollapseToggle() {
    this.collapseToggle.emit();
  }
  
  constructor(
    private _authservice: AuthService,
    private _ticketService: TicketService
  ) {
   
    this.user$ = this._ticketService.getUser(this.userId);
  }

  ngOnInit(): void {}


  
}

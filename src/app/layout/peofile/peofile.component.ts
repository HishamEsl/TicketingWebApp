import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmployee } from 'src/app/shared/models/employee.model';
import { TicketService } from 'src/app/shared/services/ticket.service';

@Component({
  selector: 'app-peofile',
  templateUrl: './peofile.component.html',
  styleUrls: ['./peofile.component.scss'],
})
export class PeofileComponent implements OnInit {
  userId: any = sessionStorage.getItem('UID');
  user$!: Observable<any[]>;
  constructor(private _ticketService: TicketService) {
    this.user$ = this._ticketService.getUser(this.userId);
  }

  ngOnInit(): void {}
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IEmployee } from 'src/app/shared/models/employee.model';
import { TicketService } from 'src/app/shared/services/ticket.service';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.scss'],
})
export class MemberDetailsComponent implements OnInit {
  employeeTickets$!: Observable<any>;
  employee$!: Observable<IEmployee[]>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _ticketService: TicketService
  ) {
    this.activatedRoute.params.subscribe((params: any) => {
      this.employeeTickets$ = this._ticketService.ticketsByClientIdAndRole(
        'Employee',
        params['id']
      );

      this.employee$ = this._ticketService.getEmplyee(params['id']);

      this.employee$.subscribe();
    });
  }

  ngOnInit(): void {}
}

import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { TicketService } from 'src/app/shared/services/ticket.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
})
export class TeamsComponent implements OnInit {
  searchText = '';
  employees$ = this._ticketService.employees$;
  constructor(
    private offcanvasService: NgbOffcanvas,
    private _ticketService: TicketService
  ) {

    this. employees$ = this._ticketService.employees$;
  }
  ngOnInit(): void {}

  openEnd(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { position: 'end' });
  }
}

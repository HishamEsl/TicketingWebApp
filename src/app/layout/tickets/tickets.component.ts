import { Component, OnInit, TemplateRef } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, combineLatest, map, merge, scan } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TicketService } from 'src/app/shared/services/ticket.service';
import { Location } from '@angular/common';
import { IUser } from 'src/app/shared/models/user.model';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
})
export class TicketsComponent implements OnInit {
  // user = this._authservice.userSubject.value;
  addNewTicketForm!: FormGroup;
  searchText = '';
  // clientId: string = this._ticketService.clientIdSelectedSubject.value;
  /*   ***********     Get Dataa *********/

  // currentUser: IUser = this._ticketService.userSelectedSubject.value;
  userId: any = sessionStorage.getItem('UID');
  role: any = sessionStorage.getItem('RL');
  gettickets$ = this._ticketService.ticketsByClientIdAndRole(
    this.role,
    this.userId
  );

  ticketsWithAdd$ = merge(
    this.gettickets$,
    this._ticketService.ticketInsertedAction$
  ).pipe(
    scan(
      (acc, value) => (value instanceof Array ? [...value] : [...acc, value]),
      [] as any[]
    )
  );

  allStatuses$ = this._ticketService.statuses$;
  allPriorities$ = this._ticketService.priorities$;

  projects$ = this._ticketService.projects(this.userId);

  /*  ****************Behavior Subject Filter ***************/
  private statusSelectedSubject = new BehaviorSubject<number>(0);
  statusSelectedAction$ = this.statusSelectedSubject.asObservable();

  private prioritySelectedSubject = new BehaviorSubject<number>(0);
  prioritySelectedAction$ = this.prioritySelectedSubject.asObservable();

  constructor(
    private offcanvasService: NgbOffcanvas,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private _authservice: AuthService,
    private _ticketService: TicketService
  ) {}

  // Tickets With CombineLatest Filter
  tickets$ = combineLatest([
    this.gettickets$,
    this.statusSelectedAction$,
    this.prioritySelectedAction$,
  ]).pipe(
    map(([tickets, sId, prId]) =>
      tickets.filter(
        (tick) =>
          (sId ? tick.statusId === sId : true) &&
          (prId ? tick.priorityId === prId : true)
      )
    )
  );

  ngOnInit(): void {

    /* Init New Ticket Form */
    this.addNewTicketForm = this.formBuilder.group({
      projectId: new FormControl('', [Validators.required]),
      title: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      description: new FormControl('', [Validators.maxLength(200)]),
    });
  }

  onCreatNewtaskClicked() {
    const obj: any = {
      projectId: +this.addNewTicketForm.controls['projectId'].value,
      title: this.addNewTicketForm.controls['title'].value,
      description: this.addNewTicketForm.controls['description'].value,
      clientId: this.userId,
    };

    this._ticketService.postTicket(this.userId, obj).subscribe((e) => {
      console.log(e, 'dd');
      this._ticketService.insertAdd(e);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Ticket has been Created ',
        showConfirmButton: false,
        timer: 1500,
      });

      this.  gettickets$ = this._ticketService.ticketsByClientIdAndRole(
        this.role,
        this.userId
      );
    
    });
  }

  openEnd(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { position: 'end' });
  }

  openLg(ticketsContent: any) {
    this.modalService.open(ticketsContent, { size: 'lg' });
  }

  //onChange Status Selected
  statusSelected(statusId: number) {
    this.statusSelectedSubject.next(+statusId);
  }

  // onChange Priority Selected
  PrioritySelected(priorityId: number) {
    this.prioritySelectedSubject.next(+priorityId);
  }

  reset() {
    this.statusSelectedSubject.next(0);

    this.prioritySelectedSubject.next(0);
  }

  get f() {
    return this.addNewTicketForm.controls;
  }
}

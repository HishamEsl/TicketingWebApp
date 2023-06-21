import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TicketService } from 'src/app/shared/services/ticket.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss'],
})
export class TicketDetailsComponent implements OnInit {
  singleTicket$!: Observable<any>;
  ticketForm: FormGroup;
  currentTicketId!: number;

  // user = this._authservice.userSubject.value;
  // currentUser = this._ticketService.userSelectedSubject.value;
  role = sessionStorage.getItem('RL');

  priorities$ = this._ticketService.priorities$;
  emplyees$ = this._ticketService.employees$;
  statues$ = this._ticketService.statuses$;
  constructor(
    private _ticketService: TicketService,
    private _authservice: AuthService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private location: Location
  ) {
    this.activatedRoute.params.subscribe((params: any) => {
      this.currentTicketId = +params['id'];
      this.singleTicket$ = this._ticketService.ticket(params['id']);
    });

    this.ticketForm = this.createFormItem('init');
  }

  /**
   * @param  itemType // For make a dynamic Form
   * it Can Be init | classRoom | subject
   * @returns FormGroup
   */

  /* Create Form Item */
  createFormItem(itemType: string): FormGroup {
    let formItem = this.fb.group({});
    switch (itemType) {
      case 'init':
        formItem = this.fb.group({
          assignTo: ['', Validators.required],
          priority: ['', Validators.required],
          estimatedTime: ['', Validators.required],
          status: '',
          comments: this.fb.array([]),
        });
        break;
      case 'comment':
        formItem = this.fb.group({
          name: '',
          comment: '',
        });
    }
    return formItem;
  }

  /* Get Class Room */
  getComment(): FormArray {
    return this.ticketForm.get('comments') as FormArray;
  }
  /* Add Class Room */
  addComment() {
    this.getComment().push(this.createFormItem('comment'));
  }

  onTicketDetailsAdminSubmit(ticket: any) {
    const obj: any = {
      statusId: ticket.statusId,
      employeeId: this.ticketForm.controls['assignTo'].value,
      priorityId: +this.ticketForm.controls['priority'].value,
      estimatedTime: this.ticketForm.controls['estimatedTime'].value,
      comments: this.ticketForm.controls['comments'].value.map((co: any) => ({
        content: co.comment,
        userId: sessionStorage.getItem('UID'),
        // ticketId: this.currentTicketId,
      })),
    };

    this._ticketService.updateTicket(ticket.id, obj).subscribe((e) => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Ticket has been updated ',
        showConfirmButton: false,
        timer: 1500,
      });

      this.location.back();
    });
  }

  onTicketDetailsEmployeeSubmit(ticket: any) {
    const obj: any = {
      statusId: +this.ticketForm.controls['status'].value,
      employeeId: ticket.employeeId,
      priorityId: ticket.priorityId,
      estimatedTime: ticket.estimatedTime,
      comments: this.ticketForm.controls['comments'].value.map((co: any) => ({
        content: co.comment,
        userId: sessionStorage.getItem('UID'),
        // ticketId: this.currentTicketId,
      })),
    };
    this._ticketService.updateTicket(ticket.id, obj).subscribe((e) => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Ticket has been updated ',
        showConfirmButton: false,
        timer: 1500,
      });

      this.location.back();
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {});
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TicketService } from 'src/app/shared/services/ticket.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss'],
})
export class AdministrationComponent implements OnInit {
  users$ = this._ticketService.users$;
  roles$ = this._ticketService.roles$;

  roleForm!: FormGroup;

  constructor(
    private _ticketService: TicketService,
    private FormBuilder: FormBuilder
  ) {
    this._ticketService.users$.subscribe((e) => {
      console.log(e);
    });
  }

  ngOnInit(): void {
    this.roleForm = this.FormBuilder.group({
      roleId: ['', Validators.required],
    });
  }

  onUpdateClick(userId: string) {
    const obj = {
      userId: userId,
      roleId: this.roleForm.controls['roleId'].value,
    };
    this._ticketService.postUserRole(obj).subscribe((e) => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'User Role has been updated !',
        showConfirmButton: false,
        timer: 1500,
      });
    });
  }

  get f() {
    return this.roleForm.controls;
  }
}

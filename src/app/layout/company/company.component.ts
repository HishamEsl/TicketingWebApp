import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TicketService } from 'src/app/shared/services/ticket.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent implements OnInit {
  searchText = '';

  companies$ = this._ticketService.companies$;

  addNewCompanyForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private _ticketService: TicketService
  ) {}

  ngOnInit(): void {
    /* Init New Ticket Form */
    this.addNewCompanyForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
    });
  }

  onCreatNewCompanyClicked() {
    const obj: any = {
      name: this.addNewCompanyForm.controls['name'].value,
    };
    this._ticketService.postCompany(obj).subscribe((e) => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'company has been Created ',
        showConfirmButton: false,
        timer: 1500,
      });
      this.companies$ = this._ticketService.companies$;
    });
  }

  onRemoveCompany(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this._ticketService.removeCompany(id).subscribe(() => {
          Swal.fire('Deleted!', 'Your recipe has been deleted.', 'success');
          this.companies$ = this._ticketService.companies$;
        });
      }
    });
  }
  get f() {
    return this.addNewCompanyForm.controls;
  }

  openLg(ticketsContent: any) {
    this.modalService.open(ticketsContent, { size: 'lg' });
  }
}

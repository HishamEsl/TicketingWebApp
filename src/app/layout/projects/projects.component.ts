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
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  addNewProjectForm!: FormGroup;
  searchText = '';
  currentClientId: any = sessionStorage.getItem('UID');
  companies$ = this._ticketService.clientCompanies(this.currentClientId);
  projects$ = this._ticketService.clientProjects(this.currentClientId);
  clients$ = this._ticketService.clients$;
  constructor(
    private formBuilder: FormBuilder,
    private _ticketService: TicketService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    /* Init New Ticket Form */
    this.addNewProjectForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      companyId: new FormControl('', [Validators.required]),
      // clientId: new FormControl('', [Validators.required]),
    });
  }

  onCreatNewProjectClicked() {
    const obj: any = {
      name: this.addNewProjectForm.controls['name'].value,
      companyId: +this.addNewProjectForm.controls['companyId'].value,
      // clientId: this.addNewProjectForm.controls['clientId'].value,
      clientId: sessionStorage.getItem('UID'),
    };

    this._ticketService.postProject(obj).subscribe((e) => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Project has been Created ',
        showConfirmButton: false,
        timer: 1500,
      });
    });
  }

  get f() {
    return this.addNewProjectForm.controls;
  }

  openLg(ticketsContent: any) {
    this.modalService.open(ticketsContent, { size: 'lg' });
  }
}

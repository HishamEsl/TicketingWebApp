import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/shared/services/ticket.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client-validation',
  templateUrl: './client-validation.component.html',
  styleUrls: ['./client-validation.component.scss']
})
export class ClientValidationComponent implements OnInit {
  searchText = '';
  usersOnHold$  = this._ticketService.usersOnHold$;
  
  constructor(private _ticketService: TicketService) { }

  ngOnInit(): void {
  }


  onConfirmed(employeeId:string){
const obj = {
  isOnHold: false
}
    this._ticketService.partUpdateAccount(employeeId,obj).subscribe((e)=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'User has been Confirmed ',
        showConfirmButton: false,
        timer: 1500,
      });

      this.usersOnHold$  = this._ticketService.usersOnHold$;
    })
  }
}

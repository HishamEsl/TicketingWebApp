import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { IUser } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TicketService } from 'src/app/shared/services/ticket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage!: string;
  constructor(
    private formBuilder: FormBuilder,
    private _authService: AuthService,
    private _ticketService: TicketService,
    private router: Router
  ) {}

  ngOnInit(): void {
    /* Init Customized Form */
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onLoginSubmit() {
    const user: any = {
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value,
    };

    this._authService.login(user).pipe(
      catchError((error) => {
        // Handle login error here
        this.errorMessage = error.error;
        return throwError(error);
      })
    ).subscribe((e: any) => {
      //Set Data
      sessionStorage.setItem('Tk', e.token);
      sessionStorage.setItem('UID', e.userId);
      sessionStorage.setItem('RL', e.roles[0]);

      const tokenDecode = JSON.parse(atob(e.token.split('.')[1]));
      this._ticketService.selectedUser(e.userId);

      this._authService.userSubject.next(tokenDecode.roles);

      const obj: IUser = {
        role: e.roles[0],
        userId: e.userId,
      };
      this._ticketService.userSelectedSubject.next(obj);

      this.router.navigate(['/layout']);
    });
  }

  get f() {
    return this.loginForm.controls;
  }
}

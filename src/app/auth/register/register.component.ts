import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MustMatch } from './validation.mustconfirm';
import { catchError, throwError } from 'rxjs';
import { IUser } from 'src/app/shared/models/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  errorMessage!: string;
  IsHoldMessage!: string;
  private _ticketService: any;
  constructor(
    private formBuilder: FormBuilder,
    private _authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    /* Init  Form */
    this.registerForm = this.formBuilder.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        userName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        confirmpwd: ['', [Validators.required]],
        phoneNumber: ['', [Validators.required]],
      },
      {
        validator: MustMatch('password', 'confirmpwd'),
      }
    );
  }

  onRegisterClick() {
    const obj = {
      firstName: this.registerForm.controls['firstName'].value,
      lastName: this.registerForm.controls['lastName'].value,
      userName: this.registerForm.controls['userName'].value,
      email: this.registerForm.controls['email'].value,
      password: this.registerForm.controls['password'].value,
      phoneNumber: this.registerForm.controls['phoneNumber'].value,
    };
    this._authService
      .register(obj)
      .pipe(
        catchError((error) => {
          // Handle login error here
          this.errorMessage = error.error;
          return throwError(error);
        })
      )
      .subscribe((e: any) => {
        this.IsHoldMessage =
          'User has been created successfully, note that you are on hold until admin confirm you as a real client.';
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
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your Account has been Created ',
          showConfirmButton: false,
          timer: 1500,
        });

        this.registerForm.reset();
        this.router.navigate(['/']);
      });
  }

  get f() {
    return this.registerForm.controls;
  }
}

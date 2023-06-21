import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { UrlEndpoints } from '../constant/url-endpoints';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = 'Auth/login';
  private registerUrl = 'Auth/register';

  userSubject = new BehaviorSubject<string>('');
  userAction$ = this.userSubject.asObservable();
  private roles!: string[];
  constructor(private _http: HttpClient, private router: Router) {}

  login = (model: any) =>
    this._http.post(UrlEndpoints.apiRoot + this.loginUrl, model);

  logout = () => {
    sessionStorage.removeItem('TK');
    this.router.navigate(['/auth']);
  };

  register = (model: any) =>
  this._http.post(UrlEndpoints.apiRoot + this.registerUrl, model).pipe(
    tap((response: any) => {
      this.roles = response.roles;
    })
  );


  getUserRoles(): string[] {
    // Return the roles array
    return this.roles;
  }


}

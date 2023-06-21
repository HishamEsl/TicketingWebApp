import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, merge, scan, shareReplay, Subject } from 'rxjs';
import { UrlEndpoints } from '../constant/url-endpoints';
import { IEmployee } from '../models/employee.model';
import { IPriority } from '../models/priority.model';
import { IProject } from '../models/projects.model';
import { IStat } from '../models/statistic.model';
import { IStatus } from '../models/status.model';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private ticketsURL = 'odata/tickets';

  private projectsURL = 'odata/projects';
  private employeesURL = 'odata/employees';
  private usersURL = 'odata/users';
  private ticketByIdURL = 'odata/tickets';
  private allStatusURL = 'odata/status';
  private allPriorityURL = 'odata/priority';
  private statisticsURL = 'odata/statistics';
  private accountURL = 'odata/accounts';

  clientIdSelectedSubject = new BehaviorSubject<string>('');
  clientIdSelectedAction$ = this.clientIdSelectedSubject.asObservable();

  userSelectedSubject = new BehaviorSubject<IUser>({ role: '', userId: '' });
  userSelectedAction$ = this.userSelectedSubject.asObservable();

  ticketInsertedSubject = new Subject<any>();
  ticketInsertedAction$ = this.ticketInsertedSubject.asObservable();

  constructor(private _http: HttpClient) {}

  tickets$ = this._http
    .get<any[]>(
      UrlEndpoints.apiRoot +
        this.ticketsURL +
        `?$expand=project,status,priority,company,comments`
    )
    .pipe(
      map((tickets: any) => {
        return tickets['value'] as any[];
      }),
      shareReplay(1)
    );

  ticketsByClientIdAndRole(role: string, clientId: string) {
    if (role == 'Admin') {
      return this._http
        .get<any[]>(
          UrlEndpoints.apiRoot +
            this.ticketsURL +
            `?$expand=project,status,priority,company`
        )
        .pipe(
          map((tickets: any) => {
            return tickets['value'] as any[];
          }),
          shareReplay(1)
        );
    } else if (role == 'Employee') {
      return this._http
        .get<any[]>(
          UrlEndpoints.apiRoot +
            this.ticketsURL +
            '?$filter=employeeId eq ' +
            `'${clientId}'` +
            `&expand=project,status,priority,company`
        )
        .pipe(
          map((tickets: any) => {
            return tickets['value'] as any[];
          }),
          shareReplay(1)
        );
    }
    return this._http
      .get<any[]>(
        UrlEndpoints.apiRoot +
          this.ticketsURL +
          '?$filter=clientId eq ' +
          `'${clientId}'` +
          `&expand=project,status,priority,company`
      )
      .pipe(
        map((tickets: any) => {
          return tickets['value'] as any[];
        }),
        shareReplay(1)
      );
  }

  ticketsWithAdd$ = merge(this.tickets$, this.ticketInsertedAction$).pipe(
    scan(
      (acc, value) => (value instanceof Array ? [...value] : [...acc, value]),
      [] as any[]
    )
  );

  postTicket(clientId: string, model: any) {
    return this._http
      .post<any>(
        UrlEndpoints.apiRoot + this.ticketsURL + '?uid=' + `${clientId}`,
        model
      )
      .pipe(
        map((ticket: any) => {
          return ticket as any;
        }),
        shareReplay(1)
      );
  }

  ticket(ticketId: number) {
    return this._http
      .get<any>(
        UrlEndpoints.apiRoot +
          this.ticketByIdURL +
          `(${ticketId})?$expand=project,status,priority,company,department,employee,client,comments`
      )
      .pipe(
        map((ticket: any) => {
          return ticket as any;
        }),
        shareReplay(1)
      );
  }

  updateTicket = (ticketId: number, ticket: any) =>
    this._http.put(
      UrlEndpoints.apiRoot + this.ticketByIdURL + `(${ticketId})`,
      ticket
    );

  // All Employees
  employees$ = this._http
    .get<IEmployee[]>(UrlEndpoints.apiRoot + this.employeesURL)
    .pipe(
      map((employees: any) => {
        return employees['value'] as IEmployee[];
      }),
      shareReplay(1)
    );

  //GET EMPLYEE

  getEmplyee(employeeId: string) {
    return this._http
      .get<IEmployee[]>(
        UrlEndpoints.apiRoot +
          this.employeesURL +
          '?$filter=Id eq ' +
          `'${employeeId}'`
      )
      .pipe(
        map((employees: any) => {
          return employees['value'] as IEmployee[];
        }),
        shareReplay(1)
      );
  }

  getUser(userId: string) {
    return this._http
      .get<IEmployee[]>(
        UrlEndpoints.apiRoot + this.usersURL + '?$filter=Id eq ' + `'${userId}'`
      )
      .pipe(
        map((employees: any) => {
          return employees['value'] as IEmployee[];
        }),
        shareReplay(1)
      );
  }


    // // Get Hold Users 
    usersOnHold$ = this._http
    .get<IStatus[]>(UrlEndpoints.apiRoot + this.usersURL+`?$filter=IsOnHold eq true`)
    .pipe(
      map((employees: any) => {
        return employees['value'] as IEmployee[];
      }),
      shareReplay(1)
    );

     // Patch Account IsOnHold

  
  partUpdateAccount = (userId: string, model: any) =>
  this._http.patch(
    UrlEndpoints.apiRoot + this.accountURL + `(${userId})`,
    model
  );


  statistic(userId: string) {
    return this._http
      .get<IStat[]>(
        UrlEndpoints.apiRoot + this.statisticsURL + `?uid=${userId}`
      )
      .pipe(
        map((statistic: any) => {
          return statistic['value'] as IStat[];
        }),
        shareReplay(1)
      );
  }

  // Get Client projects

  projects(clientId: string) {
    return this._http
      .get<IProject[]>(
        UrlEndpoints.apiRoot +
          this.projectsURL +
          '?$filter=clientId eq ' +
          `'${clientId}'`
      )
      .pipe(
        map((projects: any) => {
          return projects['value'] as IProject[];
        }),
        shareReplay(1)
      );
  }
  // // Get All Status
  statuses$ = this._http
    .get<IStatus[]>(UrlEndpoints.apiRoot + this.allStatusURL)
    .pipe(
      map((status: any) => {
        return status['value'] as IStatus[];
      }),
      shareReplay(1)
    );

  // // Get All Status
  priorities$ = this._http
    .get<IPriority[]>(UrlEndpoints.apiRoot + this.allPriorityURL)
    .pipe(
      map((priority: any) => {
        return priority['value'] as IPriority[];
      }),
      shareReplay(1)
    );

  selectedUser(userId: string) {
    this.clientIdSelectedSubject.next(userId);
  }
  insertAdd(model: any) {
    this.ticketInsertedSubject.next(model);
  }



 
}

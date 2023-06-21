import { TestBed } from '@angular/core/testing';

import { EmployeeAdminGuard } from './employee-admin.guard';

describe('EmployeeAdminGuard', () => {
  let guard: EmployeeAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EmployeeAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

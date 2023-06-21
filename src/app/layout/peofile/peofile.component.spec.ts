import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeofileComponent } from './peofile.component';

describe('PeofileComponent', () => {
  let component: PeofileComponent;
  let fixture: ComponentFixture<PeofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendenceEntryComponent } from './attendence-entry.component';

describe('AttendenceEntryComponent', () => {
  let component: AttendenceEntryComponent;
  let fixture: ComponentFixture<AttendenceEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendenceEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendenceEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetableSchedularComponent } from './timetable-schedular.component';

describe('TimetableSchedularComponent', () => {
  let component: TimetableSchedularComponent;
  let fixture: ComponentFixture<TimetableSchedularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimetableSchedularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimetableSchedularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

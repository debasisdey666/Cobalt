import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentClearenceComponent } from './student-clearence.component';

describe('StudentClearenceComponent', () => {
  let component: StudentClearenceComponent;
  let fixture: ComponentFixture<StudentClearenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentClearenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentClearenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

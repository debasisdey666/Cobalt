import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryClearanceComponent } from './library-clearance.component';

describe('LibraryClearanceComponent', () => {
  let component: LibraryClearanceComponent;
  let fixture: ComponentFixture<LibraryClearanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibraryClearanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibraryClearanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

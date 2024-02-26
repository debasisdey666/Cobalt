import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmasterComponent } from './bookmaster.component';

describe('BookmasterComponent', () => {
  let component: BookmasterComponent;
  let fixture: ComponentFixture<BookmasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookmasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

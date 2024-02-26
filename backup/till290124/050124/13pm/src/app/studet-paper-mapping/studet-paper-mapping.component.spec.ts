import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudetPaperMappingComponent } from './studet-paper-mapping.component';

describe('StudetPaperMappingComponent', () => {
  let component: StudetPaperMappingComponent;
  let fixture: ComponentFixture<StudetPaperMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudetPaperMappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudetPaperMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

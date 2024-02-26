import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegePgoramMappingComponent } from './college-pgoram-mapping.component';

describe('CollegePgoramMappingComponent', () => {
  let component: CollegePgoramMappingComponent;
  let fixture: ComponentFixture<CollegePgoramMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollegePgoramMappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollegePgoramMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

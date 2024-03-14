import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoletreeComponent } from './roletree.component';

describe('RoletreeComponent', () => {
  let component: RoletreeComponent;
  let fixture: ComponentFixture<RoletreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoletreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoletreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

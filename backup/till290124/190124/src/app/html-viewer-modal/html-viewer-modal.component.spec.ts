import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlViewerModalComponent } from './html-viewer-modal.component';

describe('HtmlViewerModalComponent', () => {
  let component: HtmlViewerModalComponent;
  let fixture: ComponentFixture<HtmlViewerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HtmlViewerModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HtmlViewerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

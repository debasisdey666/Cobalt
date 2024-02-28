import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadToExcelComponent } from './download-to-excel.component';

describe('DownloadToExcelComponent', () => {
  let component: DownloadToExcelComponent;
  let fixture: ComponentFixture<DownloadToExcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadToExcelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadToExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

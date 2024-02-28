import { TestBed } from '@angular/core/testing';

import { AttendanceEntryService } from './attendance-entry.service';

describe('AttendanceEntryService', () => {
  let service: AttendanceEntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttendanceEntryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { TimetableSchedularService } from './timetable-schedular.service';

describe('TimetableSchedularService', () => {
  let service: TimetableSchedularService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimetableSchedularService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

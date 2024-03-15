import { TestBed } from '@angular/core/testing';

import { WeeklyTimetableService } from './weekly-timetable.service';

describe('WeeklyTimetableService', () => {
  let service: WeeklyTimetableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeeklyTimetableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

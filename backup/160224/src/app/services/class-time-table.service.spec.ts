import { TestBed } from '@angular/core/testing';

import { ClassTimeTableService } from './class-time-table.service';

describe('ClassTimeTableService', () => {
  let service: ClassTimeTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassTimeTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { StudentClearenceService } from './student-clearence.service';

describe('StudentClearenceService', () => {
  let service: StudentClearenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentClearenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

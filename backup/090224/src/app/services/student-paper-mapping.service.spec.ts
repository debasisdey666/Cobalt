import { TestBed } from '@angular/core/testing';

import { StudentPaperMappingService } from './student-paper-mapping.service';

describe('StudentPaperMappingService', () => {
  let service: StudentPaperMappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentPaperMappingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

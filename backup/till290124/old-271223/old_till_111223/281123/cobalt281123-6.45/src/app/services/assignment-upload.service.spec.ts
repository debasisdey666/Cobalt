import { TestBed } from '@angular/core/testing';

import { AssignmentUploadService } from './assignment-upload.service';

describe('AssignmentUploadService', () => {
  let service: AssignmentUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignmentUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { LibraryClearanceService } from './library-clearance.service';

describe('LibraryClearanceService', () => {
  let service: LibraryClearanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibraryClearanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

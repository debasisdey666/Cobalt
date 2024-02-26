import { TestBed } from '@angular/core/testing';

import { BookmasterService } from './bookmaster.service';

describe('BookmasterService', () => {
  let service: BookmasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookmasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

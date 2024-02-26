import { TestBed } from '@angular/core/testing';

import { BookissueService } from './bookissue.service';

describe('BookissueService', () => {
  let service: BookissueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookissueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

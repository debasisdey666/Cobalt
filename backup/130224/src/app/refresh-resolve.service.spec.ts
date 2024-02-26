import { TestBed } from '@angular/core/testing';

import { RefreshResolveService } from './refresh-resolve.service';

describe('RefreshResolveService', () => {
  let service: RefreshResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefreshResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

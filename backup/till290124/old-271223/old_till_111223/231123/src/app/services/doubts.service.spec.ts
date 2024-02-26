import { TestBed } from '@angular/core/testing';

import { DoubtsService } from './doubts.service';

describe('DoubtsService', () => {
  let service: DoubtsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoubtsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

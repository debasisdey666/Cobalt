import { TestBed } from '@angular/core/testing';

import { MarksInputService } from './marks-input.service';

describe('MarksInputService', () => {
  let service: MarksInputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarksInputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

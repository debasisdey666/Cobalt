import { TestBed } from '@angular/core/testing';

import { ResultInputService } from './result-input.service';

describe('ResultInputService', () => {
  let service: ResultInputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResultInputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

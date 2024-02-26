import { TestBed } from '@angular/core/testing';

import { ScrutinyService } from './scrutiny.service';

describe('ScrutinyService', () => {
  let service: ScrutinyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrutinyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { CollegeProgrmService } from './college-progrm.service';

describe('CollegeProgrmService', () => {
  let service: CollegeProgrmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollegeProgrmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

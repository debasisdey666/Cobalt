import { TestBed } from '@angular/core/testing';

import { NoticeEventService } from './notice-event.service';

describe('NoticeEventService', () => {
  let service: NoticeEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoticeEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

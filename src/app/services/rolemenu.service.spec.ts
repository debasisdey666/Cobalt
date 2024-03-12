import { TestBed } from '@angular/core/testing';

import { RoleMenu } from './rolemenu.service';

describe('BookserviceService', () => {
  let service: RoleMenu;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleMenu);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

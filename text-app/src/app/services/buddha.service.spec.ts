import { TestBed } from '@angular/core/testing';

import { BuddhaService } from './buddha.service';

describe('BuddhaService', () => {
  let service: BuddhaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuddhaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

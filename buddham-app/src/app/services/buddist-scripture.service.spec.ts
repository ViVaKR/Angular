import { TestBed } from '@angular/core/testing';

import { BuddistScriptureService } from './buddist-scripture.service';

describe('BuddistScriptureService', () => {
  let service: BuddistScriptureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuddistScriptureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

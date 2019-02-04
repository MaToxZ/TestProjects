import { TestBed } from '@angular/core/testing';

import { AdviserService } from './adviser.service';

describe('AdviserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdviserService = TestBed.get(AdviserService);
    expect(service).toBeTruthy();
  });
});

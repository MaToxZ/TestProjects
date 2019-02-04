import { TestBed } from '@angular/core/testing';

import { CardConsumptionService } from './card-consumption.service';

describe('CardConsumptionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CardConsumptionService = TestBed.get(CardConsumptionService);
    expect(service).toBeTruthy();
  });
});

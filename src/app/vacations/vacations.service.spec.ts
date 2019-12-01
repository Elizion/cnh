import { TestBed } from '@angular/core/testing';

import { VacationsService } from './vacations.service';

describe('VacationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VacationsService = TestBed.get(VacationsService);
    expect(service).toBeTruthy();
  });
});

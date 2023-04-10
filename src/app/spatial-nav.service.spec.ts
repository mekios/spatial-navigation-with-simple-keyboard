import { TestBed } from '@angular/core/testing';

import { SpatialNavService } from './spatial-nav.service';

describe('SpatialNavService', () => {
  let service: SpatialNavService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpatialNavService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { BggApiService } from './bgg-api.service';

describe('BggApiService', () => {
  let service: BggApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BggApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

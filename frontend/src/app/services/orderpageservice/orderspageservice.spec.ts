import { TestBed } from '@angular/core/testing';

import { Orderspageservice } from './orderspageservice';

describe('Orderspageservice', () => {
  let service: Orderspageservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Orderspageservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { Cartpageservice } from './cartpageservice';

describe('Cartpageservice', () => {
  let service: Cartpageservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cartpageservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

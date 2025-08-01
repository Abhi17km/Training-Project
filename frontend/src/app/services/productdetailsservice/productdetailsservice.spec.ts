import { TestBed } from '@angular/core/testing';

import { Productdetailsservice } from './productdetailsservice';

describe('Productdetailsservice', () => {
  let service: Productdetailsservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Productdetailsservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

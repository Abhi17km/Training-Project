import { TestBed } from '@angular/core/testing';

import { Categorypageservice } from './categorypageservice';

describe('Categorypageservice', () => {
  let service: Categorypageservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Categorypageservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

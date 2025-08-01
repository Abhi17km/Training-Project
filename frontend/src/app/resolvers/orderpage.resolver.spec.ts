import { TestBed } from '@angular/core/testing';

import { OrderpageResolver } from './orderpage.resolver';

describe('OrderpageResolver', () => {
  let service: OrderpageResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderpageResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

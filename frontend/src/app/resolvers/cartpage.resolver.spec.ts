import { TestBed } from '@angular/core/testing';

import { CartpageResolver } from './cartpage.resolver';

describe('CartpageResolver', () => {
  let service: CartpageResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartpageResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

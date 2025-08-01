import { TestBed } from '@angular/core/testing';

import { ManageProducts } from './manage-products';

describe('ManageProducts', () => {
  let service: ManageProducts;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageProducts);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

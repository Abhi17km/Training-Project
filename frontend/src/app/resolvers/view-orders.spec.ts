import { TestBed } from '@angular/core/testing';

import { ViewOrders } from './view-orders';

describe('ViewOrders', () => {
  let service: ViewOrders;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewOrders);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

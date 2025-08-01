import { TestBed } from '@angular/core/testing';

import { CategorypageResolver } from './categorypage.resolver';

describe('CategorypageResolver', () => {
  let service: CategorypageResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategorypageResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

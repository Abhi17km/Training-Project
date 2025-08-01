import { TestBed } from '@angular/core/testing';

import { ManageCategories } from './manage-categories';

describe('ManageCategories', () => {
  let service: ManageCategories;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageCategories);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

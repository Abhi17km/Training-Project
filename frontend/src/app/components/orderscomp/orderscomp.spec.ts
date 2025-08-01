import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Orderscomp } from './orderscomp';

describe('Orderscomp', () => {
  let component: Orderscomp;
  let fixture: ComponentFixture<Orderscomp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Orderscomp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Orderscomp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

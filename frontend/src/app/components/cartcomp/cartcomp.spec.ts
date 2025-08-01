import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cartcomp } from './cartcomp';

describe('Cartcomp', () => {
  let component: Cartcomp;
  let fixture: ComponentFixture<Cartcomp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cartcomp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cartcomp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Logincomp } from './logincomp';

describe('Logincomp', () => {
  let component: Logincomp;
  let fixture: ComponentFixture<Logincomp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Logincomp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Logincomp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

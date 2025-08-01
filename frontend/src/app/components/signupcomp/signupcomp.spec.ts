import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Signupcomp } from './signupcomp';

describe('Signupcomp', () => {
  let component: Signupcomp;
  let fixture: ComponentFixture<Signupcomp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Signupcomp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Signupcomp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

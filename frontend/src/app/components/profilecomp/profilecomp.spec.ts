import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Profilecomp } from './profilecomp';

describe('Profilecomp', () => {
  let component: Profilecomp;
  let fixture: ComponentFixture<Profilecomp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Profilecomp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Profilecomp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Admincomp } from './admincomp';

describe('Admincomp', () => {
  let component: Admincomp;
  let fixture: ComponentFixture<Admincomp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Admincomp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Admincomp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

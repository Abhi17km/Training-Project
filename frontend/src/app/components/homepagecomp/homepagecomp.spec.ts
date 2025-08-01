import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Homepagecomp } from './homepagecomp';

describe('Homepagecomp', () => {
  let component: Homepagecomp;
  let fixture: ComponentFixture<Homepagecomp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Homepagecomp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Homepagecomp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

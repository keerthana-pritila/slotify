import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpPopUp } from './help-pop-up';

describe('HelpPopUp', () => {
  let component: HelpPopUp;
  let fixture: ComponentFixture<HelpPopUp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelpPopUp],
    }).compileComponents();

    fixture = TestBed.createComponent(HelpPopUp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueDialog } from './venue-dialog';

describe('VenueDialog', () => {
  let component: VenueDialog;
  let fixture: ComponentFixture<VenueDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VenueDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(VenueDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelVenueDialog } from './del-venue-dialog';

describe('DelVenueDialog', () => {
  let component: DelVenueDialog;
  let fixture: ComponentFixture<DelVenueDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DelVenueDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(DelVenueDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

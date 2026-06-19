import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditDialog } from './admin-edit-dialog';

describe('AdminEditDialog', () => {
  let component: AdminEditDialog;
  let fixture: ComponentFixture<AdminEditDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminEditDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminEditDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

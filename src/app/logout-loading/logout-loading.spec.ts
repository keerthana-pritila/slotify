import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutLoading } from './logout-loading';

describe('LogoutLoading', () => {
  let component: LogoutLoading;
  let fixture: ComponentFixture<LogoutLoading>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoutLoading],
    }).compileComponents();

    fixture = TestBed.createComponent(LogoutLoading);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

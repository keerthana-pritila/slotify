import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoMaterialpop } from './demomaterialpop';

describe('Materialpop', () => {
  let component: DemoMaterialpop;
  let fixture: ComponentFixture<DemoMaterialpop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemoMaterialpop],
    }).compileComponents();

    fixture = TestBed.createComponent(DemoMaterialpop);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

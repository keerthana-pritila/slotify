import { TestBed } from '@angular/core/testing';

import { Dks } from './dks';

describe('Dks', () => {
  let service: Dks;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Dks);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});






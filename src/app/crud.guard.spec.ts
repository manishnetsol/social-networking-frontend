import { TestBed } from '@angular/core/testing';

import { CrudGuard } from './crud.guard';

describe('CrudGuard', () => {
  let guard: CrudGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CrudGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

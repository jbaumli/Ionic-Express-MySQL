import { TestBed, async, inject } from '@angular/core/testing';

import { NonauthGuard } from './nonauth.guard';

describe('NonauthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NonauthGuard]
    });
  });

  it('should ...', inject([NonauthGuard], (guard: NonauthGuard) => {
    expect(guard).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { VansService } from './vans.service';

describe('VansService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VansService]
    });
  });

  it('should be created', inject([VansService], (service: VansService) => {
    expect(service).toBeTruthy();
  }));
});

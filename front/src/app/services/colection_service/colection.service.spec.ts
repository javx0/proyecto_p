import { TestBed } from '@angular/core/testing';

import { ColectionService } from './colection.service';

describe('ColectionService', () => {
  let service: ColectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { CumulativeGradeService } from './cumulative-grade.service';

describe('CumulativeGradeService', () => {
  let service: CumulativeGradeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CumulativeGradeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

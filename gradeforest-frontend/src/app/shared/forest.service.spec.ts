import { TestBed } from '@angular/core/testing';

import { ForestService } from './forest.service';

describe('ForestService', () => {
  let service: ForestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

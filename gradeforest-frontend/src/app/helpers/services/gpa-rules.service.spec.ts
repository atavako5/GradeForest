import { TestBed } from '@angular/core/testing';

import { GpaRulesService } from './gpa-rules.service';

describe('GpaRulesService', () => {
  let service: GpaRulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GpaRulesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

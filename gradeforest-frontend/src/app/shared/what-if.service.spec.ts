import { TestBed } from '@angular/core/testing';

import { WhatIfService } from './what-if.service';

describe('WhatIfService', () => {
  let service: WhatIfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WhatIfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

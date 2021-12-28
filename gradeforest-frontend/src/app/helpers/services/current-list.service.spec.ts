import { TestBed } from '@angular/core/testing';

import { CurrentListService } from './current-list.service';

describe('CurrentListService', () => {
  let service: CurrentListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

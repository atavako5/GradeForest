import { TestBed } from '@angular/core/testing';

import { CurrentListsService } from './current-lists.service';

describe('CurrentListsService', () => {
  let service: CurrentListsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentListsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { CurrentItemService } from './tree-item-viewer.service';

describe('TreeItemViewerService', () => {
  let service: CurrentItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

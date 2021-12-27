import { TestBed } from '@angular/core/testing';

import { TreeItemViewerService } from './tree-item-viewer.service';

describe('TreeItemViewerService', () => {
  let service: TreeItemViewerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreeItemViewerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

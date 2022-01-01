import { TestBed } from '@angular/core/testing';

import { SaveModeService } from './save-mode.service';

describe('SaveModeService', () => {
  let service: SaveModeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveModeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatIfIGetComponent } from './what-if-i-get.component';

describe('WhatIfIGetComponent', () => {
  let component: WhatIfIGetComponent;
  let fixture: ComponentFixture<WhatIfIGetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhatIfIGetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatIfIGetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

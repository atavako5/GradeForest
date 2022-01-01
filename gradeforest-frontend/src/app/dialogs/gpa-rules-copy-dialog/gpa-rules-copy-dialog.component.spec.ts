import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GpaRulesCopyDialogComponent } from './gpa-rules-copy-dialog.component';

describe('GpaRulesCopyComponent', () => {
  let component: GpaRulesCopyDialogComponent;
  let fixture: ComponentFixture<GpaRulesCopyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GpaRulesCopyDialogComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GpaRulesCopyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

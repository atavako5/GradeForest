import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GpaRulesDialogComponent } from './gpa-rules-dialog.component';

describe('GpaRulesDialogComponent', () => {
  let component: GpaRulesDialogComponent;
  let fixture: ComponentFixture<GpaRulesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GpaRulesDialogComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GpaRulesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GpaRulesComponent } from './gpa-rules.component';

describe('GpaRulesComponent', () => {
  let component: GpaRulesComponent;
  let fixture: ComponentFixture<GpaRulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GpaRulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GpaRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

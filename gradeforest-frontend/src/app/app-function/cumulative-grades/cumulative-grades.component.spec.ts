import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CumulativeGradesComponent } from './cumulative-grades.component';

describe('CumulativeGradesComponent', () => {
  let component: CumulativeGradesComponent;
  let fixture: ComponentFixture<CumulativeGradesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CumulativeGradesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CumulativeGradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

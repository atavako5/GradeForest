import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteListDialogComponent } from '../../app-function/search-select-list/search-select-list.component';

describe('DeleteListDialogComponent', () => {
  let component: DeleteListDialogComponent;
  let fixture: ComponentFixture<DeleteListDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteListDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

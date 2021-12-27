import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSelectListComponent } from './search-select-list.component';

describe('SearchSelectComponent', () => {
  let component: SearchSelectListComponent;
  let fixture: ComponentFixture<SearchSelectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchSelectListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSelectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

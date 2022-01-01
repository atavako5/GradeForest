import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageOfflineComponent } from './mainpage-offline.component';

describe('MainpageOfflineComponent', () => {
  let component: MainPageOfflineComponent;
  let fixture: ComponentFixture<MainPageOfflineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainPageOfflineComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageOfflineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WhatIfService {
  constructor() {}
  private whatIfModeData = new BehaviorSubject<boolean | undefined>(undefined);
  currentWhatIfMode = this.whatIfModeData.asObservable();
  setWhatIfMode(currentWhatIfMode: boolean) {
    this.whatIfModeData.next(currentWhatIfMode);
  }

  private pressedWhatIfButton = new BehaviorSubject<string>('');
  pressedWhatIfButtonObserver = this.pressedWhatIfButton.asObservable();
  sendNotification() {
    this.pressedWhatIfButton.next('');
  }
}

import { Injectable } from '@angular/core';
import { Item } from 'interfaces/item';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrentItemService {
  constructor() {}
  private data = new BehaviorSubject<Item | undefined>(undefined);
  currentData = this.data.asObservable();
  setData(data: Item | undefined) {
    this.data.next(data);
  }
}

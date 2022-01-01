import { Injectable } from '@angular/core';
import { List } from 'interfaces/list';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentListsService {

  constructor() { }
  private data = new BehaviorSubject<List[] | undefined>(undefined);
  currentData = this.data.asObservable()
  setData(data: List[] | undefined) {
    this.data.next(data);
  }
}

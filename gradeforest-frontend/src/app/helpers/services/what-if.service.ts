import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WhatIfService {

  constructor() { }
  private data = new BehaviorSubject<boolean|undefined>(undefined)
  currentData = this.data.asObservable()
  setData(data:boolean){
    this.data.next(data);
  }
}

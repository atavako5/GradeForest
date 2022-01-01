import { Injectable } from '@angular/core';
import { GPARule } from 'interfaces/gpa-rule';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GpaRulesService {

  private data = new BehaviorSubject<GPARule[] | undefined>(undefined);
  currentData = this.data.asObservable();
  setData(data: GPARule[] | undefined) {
    this.data.next(data);
  }
}

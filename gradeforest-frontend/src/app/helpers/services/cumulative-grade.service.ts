import { Injectable } from '@angular/core';
import { CumulativeGrade } from 'interfaces/cumulativeGrade';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CumulativeGradeService {
  constructor() {}
  private data = new BehaviorSubject<CumulativeGrade | undefined>(undefined);
  currentData = this.data.asObservable();
  setData(data: CumulativeGrade | undefined) {
    this.data.next(data);
  }
}

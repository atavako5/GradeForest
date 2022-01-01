import { Injectable } from '@angular/core';
import { SaveMode } from 'interfaces/save-mode';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaveModeService {

  private dataSaveMode = new BehaviorSubject<SaveMode | undefined>(undefined);
  saveMode = this.dataSaveMode.asObservable();
  setDataSaveMode(currentDataSaveMode: SaveMode) {
    this.dataSaveMode.next(currentDataSaveMode);
  }

  constructor() { }
}

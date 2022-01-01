import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { List } from 'interfaces/list';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { WhatIfService } from '../../helpers/services/what-if.service';
import { OfflineDataService } from 'src/app/helpers/services/offline-data.service';
import { SaveModeService } from 'src/app/helpers/services/save-mode.service';
import { SaveMode } from 'interfaces/save-mode';


@Injectable({
  providedIn: 'root',
})
export class ListService {
  listUrl: string = '/api/list';
  whatIfMode: boolean = false;
  saveMode: SaveMode = SaveMode.Offline;
  constructor(private http: HttpClient, private whatIfService: WhatIfService, private saveModeService: SaveModeService, private offlineDataService: OfflineDataService) {
    whatIfService.currentWhatIfMode.subscribe((whatIfMode) => {
      if (whatIfMode !== undefined) {
        this.whatIfMode = whatIfMode;
      }
    });

    saveModeService.saveMode.subscribe((saveMode) => {
      if (saveMode) {
        this.saveMode = saveMode;
      }
    })
  }

  getLists(userId: string): Observable<List[]> {
    switch (this.saveMode) {
      case SaveMode.Offline: {
        return this.offlineDataService.getLists()
      }
      case SaveMode.MyCloud: {
        return this.http
          .get<List[]>(`${this.listUrl}/lists/${userId}`)
          .pipe(catchError(this.handleError<List[]>('getList')));
      }
    }


  }

  getList(listId: string): Observable<List> {
    switch (this.saveMode) {
      case SaveMode.Offline: {
        return this.offlineDataService.getList(listId)
      }
      case SaveMode.MyCloud: {
        return this.http
          .get<List>(`${this.listUrl}/list/${listId}`)
          .pipe(catchError(this.handleError<List>('getList')));
      }
    }

  }

  addList(list: List): Observable<List> {
    switch (this.saveMode) {

      case SaveMode.Offline: {
        console.log("hello there")
        return this.offlineDataService.addList(list)
      }
      case SaveMode.MyCloud: {
        return this.http
          .post<List>(`${this.listUrl}`, list)
          .pipe(catchError(this.handleError<List>('addList', list)));
      }
    }

  }

  deleteList(listId: string): Observable<unknown> {
    switch (this.saveMode) {
      case SaveMode.Offline: {
        return this.offlineDataService.deleteList(listId)
      }
      case SaveMode.MyCloud: {
        const url = `${this.listUrl}/${listId}`;
        return this.http
          .delete(url)
          .pipe(catchError(this.handleError('deleteList')));
      }
    }

  }

  updateList(
    list: List,
    safetyOverride: boolean = false
  ): Observable<List> | undefined {

    if (this.whatIfMode === false || safetyOverride === true) {
      switch (this.saveMode) {
        case SaveMode.Offline: {

          return this.offlineDataService.updateList(list)

        }
        case SaveMode.MyCloud: {
          return this.http
            .put<List>(this.listUrl, list)
            .pipe(catchError(this.handleError('updateList', list)));
        }
      }



    } else {
      return undefined;
    }
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

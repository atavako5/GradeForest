import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { List } from 'interfaces/list';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { WhatIfService } from './what-if.service';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  listUrl: string = '/api/list';
  whatIfMode: boolean = false;
  constructor(private http: HttpClient, private whatIfService: WhatIfService) {
    whatIfService.currentData.subscribe(whatIfMode=>{
      if(whatIfMode){
        this.whatIfMode = whatIfMode
      }
    })

  }

  getLists(userId: string): Observable<List[]> {
    return this.http
      .get<List[]>(`${this.listUrl}/lists/${userId}`)
      .pipe(catchError(this.handleError<List[]>('getList')));
  }

  getList(listId: string): Observable<List> {
    return this.http
      .get<List>(`${this.listUrl}/list/${listId}`)
      .pipe(catchError(this.handleError<List>('getList')));
  }

  addList(list: List): Observable<List> {
    return this.http
      .post<List>(`${this.listUrl}`, list)
      .pipe(catchError(this.handleError<List>('addList', list)));
  }

  deleteList(id: string): Observable<unknown> {
    const url = `${this.listUrl}/${id}`;
    return this.http
      .delete(url)
      .pipe(catchError(this.handleError('deleteList')));
  }

  updateList(list: List, safetyOverride: boolean = false): Observable<List> | undefined {
    console.log("WHAT MODE:",this.whatIfMode)
    if(this.whatIfMode === false || safetyOverride === true){
    
      return this.http
      .put<List>(this.listUrl, list)
      .pipe(catchError(this.handleError('updateList', list)));
    }else{
      return undefined
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

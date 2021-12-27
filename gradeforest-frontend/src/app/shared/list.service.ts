import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { List } from 'interfaces/list';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  listUrl: string = '/api/list';

  constructor(private http: HttpClient) {}

  // Get the status
  getLists(userId: string): Observable<List[]> {
    return this.http
      .get<List[]>(`${this.listUrl}/${userId}`)
      .pipe(catchError(this.handleError<List[]>('getList')));
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

  updateList(list: List): Observable<List> {
    return this.http
      .put<List>(this.listUrl, list)
      .pipe(catchError(this.handleError('updateList', list)));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'interfaces/user';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userUrl: string = "/api/user"

  constructor(private http: HttpClient) { }

  // Get the status
  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.userUrl}/${id}`)
      .pipe(
        catchError(this.handleError<User>('getUser'))
      );

  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.userUrl}`, user)
      .pipe(
        catchError(this.handleError<User>('addUser', user))
      );
  }

  deleteUser(id: number): Observable<unknown> {
    const url = `${this.userUrl}/${id}`;
    return this.http.delete(url)
      .pipe(
        catchError(this.handleError('deleteUser'))
      );
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.userUrl, user)
      .pipe(
        catchError(this.handleError('updateUser', user))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

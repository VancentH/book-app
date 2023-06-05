import { environment } from '../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Book } from '../models/book';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private httpClient: HttpClient) { }

  private baseUrl: string = `${environment.apiUrl}/api/books`;

  // get book list
  getAll(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(this.baseUrl).pipe(
      tap((_) => console.log('fetch books')),
      catchError(this.handleError<any>('getAll'))
    );
  }

  // create a new book
  create(book: Partial<Book>): Observable<Book[]> {
    const body = `bookname=${book.bookname}&author=${book.author}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };

    return this.httpClient.post<Book>(this.baseUrl, body, httpOptions).pipe(
      catchError(this.handleError<any>('create'))
    );
  }

  // update a book
  update(book: Partial<Book>): Observable<any> {
    return this.httpClient
      .put<{ book: Book }>(`${this.baseUrl}`,
        {
          id: book.id,
          bookname: book.bookname,
          author: book.author
        })
      .pipe(
        catchError(this.handleError<Number>('update'))
      );
  }

  // remove a book
  delete(id: string): Observable<void> {
    return this.httpClient
      .delete<void>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError<void>('delete')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}

import { environment } from '../../environments/environment.prod';
import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
=======
import { HttpClient, HttpHeaders } from '@angular/common/http';
>>>>>>> 52e1f09bce4e7c7db7fc52bc578b66e38a7654e8
import { Observable, of } from 'rxjs';
import { Book } from '../models/book';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private httpClient: HttpClient) { }

  private baseUrl: string = `${environment.apiUrl}/api/v1/books`;

  // get book list
  getAll(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(this.baseUrl).pipe(
      tap((_) => console.log('fetch books')),
      catchError(this.handleError<Book[]>('getAll', []))
    );
  }

  create(book: Partial<Book>): Observable<Book[]> {
    const body = `bookname=${book.bookname}&author=${book.author}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };

    return this.httpClient.post(this.baseUrl, body, httpOptions).pipe(
      tap((data) => console.log(data)),
      map((data) => data as Book[]),
      catchError(this.handleError<any>('create'))
    );
  }

  // update a book
  update(book: Partial<Book>): Observable<Book> {
    return this.httpClient
      .put<{ book: Book }>(`${this.baseUrl}`, { book: book })
      .pipe(
        map((data) => data.book),
        catchError(this.handleError<Book>('update'))
      );
  }

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

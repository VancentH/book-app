import { Store } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Book } from '../../shared/models/book';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';
import {
  addBookAction,
  addBookSuccess,
  deleteBookAction,
  deleteBookSuccess,
  updateBookAction,
  updateBookSuccess,
  loadBookListAction,
  loadBookListSuccess,
} from './books.actions';
import { BookService } from '../service/book.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { from, EMPTY } from 'rxjs';
import { AppState } from './app.state';

@Injectable()
export class BooksEffects {
  constructor(private actions$: Actions, private BookService: BookService) {}

  loadBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBookListAction),
      switchMap(() =>
        from(this.BookService.getAll()).pipe(
          map((books) => loadBookListSuccess({ books: books })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  removeBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteBookAction),
      switchMap((action) =>
        this.BookService.delete(action.id).pipe(
          map(() => deleteBookSuccess({ id: action.id })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  addBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addBookAction),
      mergeMap((action) =>
        this.BookService.create(action.book).pipe(
          map((book) => {
            const newbook = { ...action.book, id: book.id };
            return addBookSuccess({ book: newbook });
          })
        )
      )
    )
  );

  updateBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateBookAction),
      switchMap((action) =>
        this.BookService.update(action.book).pipe(
          map((book) => updateBookSuccess({ book: action.book }))
        )
      )
    )
  );
}

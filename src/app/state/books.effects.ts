import { Store } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Book } from '../models/book';
import { map, switchMap, catchError } from 'rxjs/operators';
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
import { BookService } from '../services/book.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { from, EMPTY } from 'rxjs';
import { AppState } from './app.state';

@Injectable()
export class BooksEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private BookService: BookService
  ) {}

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

  // );

  // removeBook$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(bookActions.RemoveBookAction),
  //     map((action) => action.payload),
  //     switchMap((id) =>
  //       this.bookService.delete(id).pipe(
  //         map(() => bookActions.RemoveBookSuccessAction()),
  //         catchError(() => EMPTY)
  //       )
  //     )
  //   )
  // );
}

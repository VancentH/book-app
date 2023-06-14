import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import * as bookActions from '../actions/books.actions';
import { BookService } from '../services/book.service';

@Injectable()
export class BooksEffects {
  constructor(private actions$: Actions, private bookService: BookService) {}

  loadBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bookActions.GetBookListAction),
      switchMap(() =>
        this.bookService.getAll().pipe(
          map((books) =>
            bookActions.GetBookListSuccessAction({ payload: books })
          ),
          catchError(() => EMPTY)
        )
      )
    )
  );

  removeBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bookActions.RemoveBookAction),
      map((action) => action.payload),
      switchMap((id) =>
        this.bookService.delete(id).pipe(
          map(() => bookActions.RemoveBookSuccessAction()),
          catchError(() => EMPTY)
        )
      )
    )
  );
}

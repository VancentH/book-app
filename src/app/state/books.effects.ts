import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, exhaustMap } from 'rxjs/operators';
import { BookService } from '../services/book.service';

@Injectable()
export class BookEffects {
  constructor(private actions$: Actions, private bookService: BookService) {}

  loadBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Book] Load Books'),
      exhaustMap(() =>
        this.bookService.getAll().pipe(
          map((books) => ({
            type: '[Books API] Books Loaded Success',
            payload: books,
          })),
          catchError(() => EMPTY)
        )
      )
    )
  );
}

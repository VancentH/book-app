import { createReducer, on } from '@ngrx/store';
import * as bookActions from '../actions/books.actions';
import { BookState } from './app.states';

export const initialState: BookState = { books: [], message: '' };

// Create reducer
export const booksReducer = createReducer(
  initialState,
  on(bookActions.GetBookListSuccessAction, (state, { payload }) => ({
    books: payload,
    message: 'Success',
  }))
);

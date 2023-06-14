// Create selector
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { BookState } from '../reducers/app.states';

export const getBookState = createFeatureSelector<BookState>('bookState');
export const getBooks = createSelector(
  getBookState,
  (state: BookState) => state.books
);

export const getMessage = createSelector(
  getBookState,
  (state: BookState) => state.message
);

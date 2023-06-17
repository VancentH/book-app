import {
  addBookSuccess,
  loadBookListSuccess,
  updateBookAction,
  updateBookSuccess,
  deleteBookAction,
  deleteBookSuccess,
  addBookAction,
  loadBookListAction,
} from './books.actions';
import { createReducer, on } from '@ngrx/store';
import { Book } from '../models/book';

export interface BookState {
  books: Book[];
  error: string;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: BookState = {
  books: [],
  error: '',
  status: 'pending',
};

export const booksReducer = createReducer(
  // Supply the initial state
  initialState,
  // Trigger add the book to the books array
  on(addBookAction, (state, { book }) => ({
    ...state,
    status: <const>'pending',
    books: [...state.books, book],
  })),
  // Add the new book to the books array
  on(addBookSuccess, (state, { book }) => ({
    ...state,
    status: <const>'success',
    books: [...state.books, book],
  })),
  // Trigger remove the book from the books array
  on(deleteBookAction, (state, { id }) => ({
    ...state,
    status: <const>'pending',
    books: state.books.filter((book) => book.id === id),
  })),
  // remove the book from the books array
  on(deleteBookSuccess, (state, { id }) => ({
    ...state,
    status: <const>'success',
    books: state.books.filter((book) => book.id === id),
  })),
  // Trigger loading the books
  on(loadBookListAction, (state) => ({ ...state, status: <const>'loading' })),
  // Handle successfully loaded books
  on(loadBookListSuccess, (state, { books }) => ({
    ...state,
    status: <const>'success',
    books: books,
  }))
);

// TODO:
// on(updateBookSuccess, (state, action) => {
//   return booksAdapter.updateOne(action.book, state);
// })

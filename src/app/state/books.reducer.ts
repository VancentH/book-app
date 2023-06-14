import {
  addBookSuccess,
  loadBookListSuccess,
  updateBookAction,
  updateBookSuccess,
  deleteBookAction,
  deleteBookSuccess,
} from './books.actions';
import { createReducer, on } from '@ngrx/store';
import { initialState, booksAdapter } from './app.states';

const _booksReducer = createReducer(
  initialState,
  on(addBookSuccess, (state, action) => {
    return booksAdapter.addOne(action.book, {
      ...state,
      book: action.book, // FIXME:
    });
  }),
  on(updateBookSuccess, (state, action) => {
    return booksAdapter.updateOne(action.book, state);
  }),
  on(deleteBookSuccess, (state, { id }) => {
    return booksAdapter.removeOne(id, state);
  }),
  on(loadBookListSuccess, (state, action) => {
    return booksAdapter.setAll(action.books, {
      ...state,
      book: action.books, // FIXME:
    });
  })
);

export function booksReducer(state, action) {
  return _booksReducer(state, action);
}

// https://github.com/leelanarasimha/ngrx-counter/blob/master/src/app/posts/state/posts.reducer.ts

import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Book } from '../models/book';

export interface AppState {
  bookState: BookState;
}

export interface BookState extends EntityState<Book> {
  books: Book[];
  message: string;
}

// TODO: explain
export const booksAdapter = createEntityAdapter<Book>();

// TODO: explain
export const initialState: BookState = booksAdapter.getInitialState({
  books: [],
  message: '',
});

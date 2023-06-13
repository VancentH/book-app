import { createActionGroup, props } from '@ngrx/store';
import { Book } from '../models/book';

export const BooksActions = createActionGroup({
  source: 'Books',
  events: {},
});

export const BooksApiActions = createActionGroup({
  source: 'Books API',
  events: {
    'Add Book': props<Book>(),
    'Get Book List': props<{ books: ReadonlyArray<Book> }>(),
    'Update Book': props<Book>(),
    'Remove Book': props<{ id: string }>(),
  },
});

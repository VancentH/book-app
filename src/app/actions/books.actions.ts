import { createAction, createActionGroup, props } from '@ngrx/store';
import { Book } from '../models/book';

export const GetBookListAction = createAction('[BOOK] Get Book List');
export const GetBookListSuccessAction = createAction(
  '[BOOK] Get Book List Success',
  props<{ payload: Book[] }>()
);
export const AddBookAction = createAction(
  '[BOOK] Add Book',
  props<{ payload: Book }>()
);
export const AddBookSuccessAction = createAction(
  '[BOOK] Add Book Success',
  props<{ payload: Book }>()
);
export const UpdateBookAction = createAction(
  '[BOOK] Update Book',
  props<{ payload: Book }>()
);
export const UpdateBookSuccessAction = createAction(
  '[BOOK] Update Book Success',
  props<{ payload: Book }>()
);
export const RemoveBookAction = createAction(
  '[BOOK] Remove Book',
  props<{ payload: string }>()
);
export const RemoveBookSuccessAction = createAction(
  '[BOOK] Remove Book Success'
);

// export const BooksActions = createActionGroup({
//   source: 'Books',
//   events: {},
// });

// export const BooksApiActions = createActionGroup({
//   source: 'Books API',
//   events: {
//     'Add Book': props<Book>(),
//     'Get Book List': props<{ books: ReadonlyArray<Book> }>(),
//     'Update Book': props<Book>(),
//     'Remove Book': props<{ id: string }>(),
//   },
// });

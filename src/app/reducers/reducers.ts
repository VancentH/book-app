import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.states';
import * as fromReducer from './books.reducer';

export const reducers: ActionReducerMap<AppState> = {
  bookState: fromReducer.booksReducer,
};

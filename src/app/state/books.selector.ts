import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Book } from '../models/book';

export const selectsBook = createFeatureSelector<ReadonlyArray<Book>>('books');

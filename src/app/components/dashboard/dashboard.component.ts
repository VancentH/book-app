import { Component, OnInit, Input } from '@angular/core';

import { Store } from '@ngrx/store';
import { Book } from '../../models/book';
import {
  loadBookListAction,
  deleteBookAction,
  updateBookAction,
} from '../../state/books.actions';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  @Input() books: Book[] = [];

  enableUpdate: boolean = false;
  updateId: string = '';
  updatedBook: Book =
    {
      id: '',
      bookname: '',
      author: '',
    } || [];

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadBookListAction());
  }

  deleteBook(book: Book): void {
    console.log(
      '🚀 ~ file: dashboard.component.ts:49 ~ DashboardComponent ~ deleteBook ~ book:',
      book
    );
    if (confirm(`Remove book: ${book.bookname} ?`)) {
      this.store.dispatch(deleteBookAction({ id: book.id }));
    }
  }

  updateBook(book: Book): void {
    this.enableUpdate = true;
    this.updateId = book.id;
    this.updatedBook = Object.assign({}, book);
  }

  cancelUpdate(): void {
    this.enableUpdate = false;
    this.updateId = '';
  }

  confirmUpdate(book: Book): void {
    console.log(
      '🚀 ~ file: dashboard.component.ts:74 ~ DashboardComponent ~ confirmUpdate ~ book:',
      book
    );
    if (!book.bookname) {
      alert('Book name must not be empty.');
      return;
    }
    if (!book.author) {
      alert('Author must not be empty.');
      return;
    }
    this.store.dispatch(updateBookAction({ book }));
    this.enableUpdate = false;
    this.updateId = '';
  }

  trackByFn(index: number, item: { id: string }) {
    return item.id;
  }
}

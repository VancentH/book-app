import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromReducer from '../../reducers/books.reducer';
import * as fromActions from '../../actions/books.actions';
import * as fromSelector from '../../selectors/books.selector';
import { BookState } from '../../reducers/app.states';
import { Book } from '../../models/book';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  books$: Observable<Book[]>;
  message$: Observable<string>;

  @Output() update = new EventEmitter<Book>();
  @Output() remove = new EventEmitter<Book>();

  enableUpdate: boolean = false;
  updateId: string = '';
  destroy$ = new Subject<void>();

  constructor(private store: Store<{ books: Book[] }>) {
    this.books$ = this.store.select(fromSelector.getBooks);
    this.message$ = this.store.select(fromSelector.getMessage);
  }

  ngOnInit(): void {
    this.store.dispatch(fromActions.GetBookListAction());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // deleteBook(book: Book): void {
  //   const result = confirm(`Remove book: ${book.bookname} ?`);
  //   if (result) {
  //     this.bookService
  //       .delete(book.id)
  //       .pipe(takeUntil(this.destroy$))
  //       .subscribe(() => {
  //         // this.books = this.books.filter((item) => item !== book);
  //         alert('Remove successfully.');
  //       });
  //   }
  // }

  updateBook(book: Book): void {
    // if (this.updateId !== book.id) this.getBooks();
    this.enableUpdate = true;
    this.updateId = book.id;
  }

  cancelUpdate(): void {
    this.enableUpdate = false;
    this.updateId = '';
    // this.getBooks(); // refresh the book list
  }

  // confirmUpdate(book: Book): void {
  //   if (!book.bookname) {
  //     alert('Book name must not be empty.');
  //     return;
  //   }
  //   if (!book.author) {
  //     alert('Author must not be empty.');
  //     return;
  //   }

  //   this.bookService
  //     .update(book)
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe({
  //       next: (res) => {
  //         if (res === 1) alert('Update successfully.');
  //         else alert('Update failed.');
  //         // this.getBooks();
  //         this.enableUpdate = false;
  //         this.updateId = '';
  //       },
  //       error: (e) => console.error(e),
  //     });
  // }

  trackByFn(index: number, item: { id: string }) {
    return item.id;
  }
}

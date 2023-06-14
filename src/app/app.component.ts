import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Book } from './models/book';

import { BookService } from './services/book.service';
import { Observable } from 'rxjs';
import * as fromActions from './actions/books.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    private bookService: BookService,
    private store: Store<{ books: Book[] }>
  ) {}

  title = 'book-app';
  books$: Observable<Book[]> = this.store.select((state) => state.books);
  enableUpdate: boolean = false;
  updateId: string = '';

  onUpdate(book: Book): void {
    if (!book.bookname) {
      alert('Book name must not be empty.');
      return;
    }
    if (!book.author) {
      alert('Author must not be empty.');
      return;
    }

    console.log(
      '🚀 ~ file: app.component.ts:28 ~ AppComponent ~ onUpdate ~ book:',
      book
    );

    // this.bookService.update(book).subscribe({
    //   next: (res) => {
    //     if (res === 1) {
    //       alert('Update successfully.');
    //       this.store.dispatch(BooksApiActions.updateBook(book));
    //     } else {
    //       alert('Update failed.');
    //     }
    //     // this.getBooks();
    //     // this.enableUpdate = false;
    //     // this.updateId = '';
    //   },
    //   error: (e) => console.error(e),
    // });
  }

  onRemove(book: Book): void {
    const result = confirm(`Remove book: ${book.bookname} ?`);
    if (result) {
      // this.bookService.delete(book.id).subscribe(() => {
      this.store.dispatch(fromActions.RemoveBookAction({ payload: book.id }));
      //this.getBookList();
      //   alert('Remove successfully.');
      // });
    }
  }

  // getBookList(): void {
  //   this.bookService
  //     .getAll()
  //     .subscribe((books) =>
  //       this.store.dispatch(BooksApiActions.getBookList({ books }))
  //     );
  // }

  ngOnInit() {
    // this.bookService.getAll().subscribe((books) =>
    // this.store.dispatch(BooksApiActions.getBookList({ books }))
    // this.store.dispatch({ type: '[Book] Load Books' });
    // );
    // this.getBookList();
  }
}

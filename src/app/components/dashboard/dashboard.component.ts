import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  books: Book[] = [];
  storeTempBook: Book = {
    id: '',
    author: '',
    bookname: '',
  };

  enableUpdate: boolean = false;
  updateId: string = '';
  destroy$ = new Subject<void>();

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.getBooks();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getBooks(): void {
    this.bookService.getAll().subscribe((books) => (this.books = books));
  }

  deleteBook(book: Book): void {
    const result = confirm(`Remove book: ${book.bookname} ?`);
    if (result) {
      this.bookService
        .delete(book.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.books = this.books.filter((item) => item !== book);
          alert('Remove successfully.');
        });
    }
  }

  updateBook(book: Book): void {
    if (this.updateId !== book.id) this.getBooks();
    this.enableUpdate = true;
    this.updateId = book.id;
  }

  cancelUpdate(): void {
    this.enableUpdate = false;
    this.updateId = '';
    this.getBooks(); // refresh the book list
  }

  confirmUpdate(book: Book): void {
    if (!book.bookname) {
      alert('Book name must not be empty.');
      return;
    }
    if (!book.author) {
      alert('Author must not be empty.');
      return;
    }

    this.bookService
      .update(book)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          if (res === 1) alert('Update successfully.');
          else alert('Update failed.');
          this.getBooks();
          this.enableUpdate = false;
          this.updateId = '';
        },
        error: (e) => console.error(e),
      });
  }

  trackByFn(index: number, item: { id: string }) {
    return item.id;
  }
}

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
  books: Book[] = [
    {
      id: '1',
      bookname: '1',
      author: '1',
    },
    {
      id: '2',
      bookname: '2',
      author: '2',
    },
  ];

  enableUpdate: boolean = false;
  idTobeUpdate: string = '';
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
    // this.bookService.getAll().subscribe((books) => (this.books = books));
  }

  deleteBook(book: Book): void {
    // conform dialog
    const result = confirm(`Remove item id: ${book.id} ?`);
    if (result) {
      this.bookService
        .delete(book.id) // TODO: handle delete error
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.books = this.books.filter((item) => item !== book);
          alert('Remove successfully');
        });
    }
  }

  updateBook(book: Book): void {
    console.log('cancelUpdate');
    this.enableUpdate = true;
    this.idTobeUpdate = book.id;
  }

  cancelUpdate(): void {
    console.log('cancelUpdate');
    this.enableUpdate = false;
    this.idTobeUpdate = '';

  }

  confirmUpdate(book: Book): void {
    console.log('confirmUpdate');
    console.log(book);

    if (!book.bookname) {
      alert('Book name must not be empty.');
      return;
    }
    if (!book.author) {
      alert('Author must not be empty.');
      return;
    }

    console.log('successfully');
    return;
    this.bookService
      .update(book)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.getBooks();
        this.enableUpdate = false;
        this.idTobeUpdate = '';
        alert('Update successfully');
      });
  }

  trackByFn(index: number, item: { id: string }) {
    return item.id;
  }
}

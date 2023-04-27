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
    this.bookService
      .delete(book.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.books = this.books.filter((item) => item !== book);
      });
  }

  trackByFn(index: number, item: { id: string }) {
    return item.id;
  }
}

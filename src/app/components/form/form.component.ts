import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Book } from '../../models/book';

import { BookService } from '../../services/book.service';
import { BooksApiActions } from '../../state/books.actions';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  book: Book = {
    id: '',
    bookname: '',
    author: '',
  };

  constructor(private bookService: BookService, private store: Store) {}

  ngOnInit(): void {}

  addBook(book: Book): void {
    if (!book.bookname) {
      alert('please enter a book name!');
      return;
    }
    if (!book.author) {
      alert('please enter a author!');
      return;
    }
    this.bookService.create(book).subscribe({
      next: (res) => {
        alert('Create a new book successfully.');
        this.store.dispatch(BooksApiActions.addBook(book));
      },
      error: (e) => console.error(e),
    });
  }
}

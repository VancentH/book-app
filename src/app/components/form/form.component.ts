import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';

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

  constructor(private bookService: BookService) { }

  ngOnInit(): void { }

  addBook(book: Book): void {
    // not empty
    if (!book.bookname) alert('please enter a book name!');
    if (!book.author) alert('please enter a author!');

    this.bookService.create(book).subscribe({
      next: (res) => {
        alert('Create a new book successfully.');
      },
      error: (e) => console.error(e),
    });

    // TODO: refresh the books

  }

}

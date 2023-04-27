import { Component, OnInit } from '@angular/core';
import { Book } from '../model/book';
import { BookService } from '../book.service';

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

  constructor(private bookService: BookService) {}

  ngOnInit(): void {}

  addBook(): void {
    // not empty
    if (!this.book.bookname) alert('please enter a book name!');
    if (!this.book.author) alert('please enter a author!');

    // payload
    const data = {
      bookname: this.book.bookname,
      author: this.book.author,
    };

    this.bookService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        alert('Add a new book successfully.');
      },
      error: (e) => console.error(e),
    });

    // TODO: refresh the books
  }

}

import { Component, OnInit } from '@angular/core';
import { Book } from '../model/book';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  books: Book[] = [
    {
      bookId: 'b01',
      bookName: 'Harry Potter and the Prisoner of Azkaban, Book 3',
      author: 'J.K. Rowling'
    },
    {
      bookId: 'b02',
      bookName: 'Harry Potter and the Deathly Hallows, Book 7',
      author: 'J.K. Rowling'
    },
    {
      bookId: 'b03',
      bookName: "The Desolations of Devil's Acre: Miss Peregrine's Peculiar Children, Book 6",
      author: 'Ransom Riggs'
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

  trackByFn(index: number, item: { bookId: string }) {
    return item.bookId;
  }
}

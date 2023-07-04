import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { loadBookListAction } from './state/books.actions';
import { selectAllBooks } from './state/books.selectors';
import { AppState } from './state/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private store: Store<AppState>) {}

  title = 'book-app';
  books$ = this.store.select(selectAllBooks);

  ngOnInit() {
    this.store.dispatch(loadBookListAction());
  }
}

import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor() {}

  title = 'book-app';
  // books$ = this.store.select(selectAllBooks);

  // ngOnInit() {
  //   this.store.dispatch(loadBookListAction());
  // }
}

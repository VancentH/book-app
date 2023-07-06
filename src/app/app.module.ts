import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { DashboardComponent } from './modules/home/components/dashboard/dashboard.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; //Import FormsModule
import { FormComponent } from './modules/home/components/form/form.component';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BooksEffects } from './core/state/books.effects';
import { booksReducer } from './core/state/books.reducers';
import { HomeComponent } from './modules/home/pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    FormComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({ books: booksReducer }),
    EffectsModule.forRoot([BooksEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

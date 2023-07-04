import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { DashboardComponent } from './modules/home/components/dashboard/dashboard.component';

import { FormsModule } from '@angular/forms'; //Import FormsModule
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './modules/home/components/form/form.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
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

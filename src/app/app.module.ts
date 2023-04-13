import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CounterComponent} from './counter/counter/counter.component';
import {CounterButtonComponent} from './counter/counter-button/counter-button.component';
import {CounterOutputComponent} from './counter/counter-output/counter-output.component';
import {StoreModule} from "@ngrx/store";
import {counterReducer} from "./counter/state/counter.reducer";
import { CustomCounterInputComponent } from './counter/custom-counter-input/custom-counter-input.component';
import {FormsModule} from "@angular/forms";
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { PostListComponent } from './posts/post-list/post-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    CounterButtonComponent,
    CounterOutputComponent,
    CustomCounterInputComponent,
    HomeComponent,
    HeaderComponent,
    PostListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({counter: counterReducer}, {}),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

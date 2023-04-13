import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CounterComponent} from './counter/counter/counter.component';
import {CounterButtonComponent} from './counter/counter-button/counter-button.component';
import {CounterOutputComponent} from './counter/counter-output/counter-output.component';
import {StoreModule} from "@ngrx/store";
import {counterReducer} from "./counter/state/counter.reducer";

@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    CounterButtonComponent,
    CounterOutputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({counter: counterReducer}, {})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

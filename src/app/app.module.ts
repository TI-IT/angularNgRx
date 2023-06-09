import {NgModule, isDevMode} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {StoreModule} from "@ngrx/store";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {EffectsModule} from "@ngrx/effects";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';
import {appReducer} from "./store/app.state";
import {AuthEffects} from "./auth/state/auth.effects";
import {AuthTokenInterceptor} from './services/AuthToken.interceptor'
import {StoreRouterConnectingModule} from '@ngrx/router-store'
import {CustomSerializer} from './store/router/custom-route-serializer'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    EffectsModule.forRoot([AuthEffects]),
    StoreModule.forRoot(appReducer, {}),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: !isDevMode()}),
    StoreDevtoolsModule.instrument({
      // maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and store changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer,
    }),
    BrowserAnimationsModule,
    MatFormFieldModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}

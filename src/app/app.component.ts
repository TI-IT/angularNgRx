import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "./store/app.state";
import {getErrorMessage, getLoading} from "./store/Shared/shared.selector";
import {autoLogin} from "./auth/state/auth.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angularNgRx';

  showLoading$: Observable<boolean>;
  errorMessage$: Observable<string>
  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.showLoading$ = this.store.select(getLoading);
    this.errorMessage$ = this.store.select(getErrorMessage);
    this.store.dispatch( autoLogin());
  }

}

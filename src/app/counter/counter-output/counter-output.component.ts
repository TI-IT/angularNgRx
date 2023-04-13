import {Component, Input, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable, Subscription} from "rxjs";
import {getCounter} from "../state/counter.selector";
import {AppState} from "../../state/app.state";

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.scss']
})
export class CounterOutputComponent implements OnInit{
  counter$: Observable<number>;
  constructor(private store: Store<AppState>) {
  }
  ngOnInit(): void {
    this.counter$ = this.store.select(getCounter);
  }
}

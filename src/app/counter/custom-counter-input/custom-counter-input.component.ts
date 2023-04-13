import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {CounterState} from "../state/counter.state";
import {customIncrement, onChangeChannelName} from "../state/counter.actions";
import {getChannelName} from "../state/counter.selector";
import {Observable} from "rxjs";

@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styleUrls: ['./custom-counter-input.component.scss']
})
export class CustomCounterInputComponent implements OnInit{

  value: number;
  channelName$: Observable<string>;
  constructor(private store: Store<{ counter: CounterState }>) {
  }
  ngOnInit(): void {
    this.channelName$ = this.store.select(getChannelName)
  }

  onAdd(){
    if(this.value){
      this.store.dispatch(customIncrement({value: this.value}))
    }

  }
  onChangeChannelName(){
    this.store.dispatch(onChangeChannelName())
  }

}

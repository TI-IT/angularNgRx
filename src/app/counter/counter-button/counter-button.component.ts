import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-counter-button',
  templateUrl: './counter-button.component.html',
  styleUrls: ['./counter-button.component.scss']
})
export class CounterButtonComponent implements OnInit{

  @Output() increment = new EventEmitter<void>();
  @Output() decrement = new EventEmitter<void>();
  @Output() reset = new EventEmitter<void>();

  constructor() {
  }
  ngOnInit(): void {
  }

  onIncrement(){
    this.increment.emit();
  }

  onDecrement(){
    this.decrement.emit();
  }

  onReset(){
    this.reset.emit();
  }

}

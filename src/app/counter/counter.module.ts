import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CounterComponent} from "./counter/counter.component";
import {CommonModule} from "@angular/common";
import {CounterButtonComponent} from "./counter-button/counter-button.component";
import {CounterOutputComponent} from "./counter-output/counter-output.component";
import {CustomCounterInputComponent} from "./custom-counter-input/custom-counter-input.component";
import {FormsModule} from "@angular/forms";

const routes: Routes = [
  {path: '', component: CounterComponent},
]

@NgModule({
  declarations: [
    CounterComponent,
    CounterButtonComponent,
    CounterOutputComponent,
    CustomCounterInputComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ]
})
export class CounterModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {CounterComponent} from "./counter/counter/counter.component";
import {PostListComponent} from "./posts/post-list/post-list.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'counter', component: CounterComponent},
  {path: 'posts', component: PostListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

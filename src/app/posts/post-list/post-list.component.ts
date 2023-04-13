import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../state/app.state";
import {Observable} from "rxjs";
import {getPosts} from "../state/posts.selector";
import {Post} from "../../models/posts.model";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit{
  posts$: Observable<Post[]>

  constructor(private  store: Store<AppState>) {
  }
  ngOnInit(): void {
    this.posts$ = this.store.select(getPosts);
  }

}

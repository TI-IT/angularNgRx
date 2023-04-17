import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.state";
import {Observable} from "rxjs";
import {getPosts} from "../state/posts.selector";
import {Post} from "../../models/posts.model";
import {deletePost} from "../state/post.action";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts$: Observable<Post[]>

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.posts$ = this.store.select(getPosts);
  }

  onDeletePost(id: any) {
    if (confirm("Вы уверены что хотите удалить?")) {
      this.store.dispatch(deletePost({id}));
    }
  }
}


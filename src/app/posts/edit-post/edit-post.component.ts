import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.state";
import {getPostById} from "../state/posts.selector";
import {Post} from "../../models/posts.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {updatePost} from "../state/post.action";

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements  OnInit, OnDestroy{
  post: Post;
  postForm: FormGroup;
  postSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.store.select(getPostById).subscribe((post) => {
      if (post) {
        this.post = post;
        this.postForm.patchValue({
          title: post.title,
          description: post.description,
        });
      }
    });
  }

  createForm(){
    this.postForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ])
    })
  }

  onUpdatePost(){
    if(!this.postForm.valid) {
      return;
    }
      const title = this.postForm.value.title;
      const description = this.postForm.value.description;

      //dispatch action
      const post: Post = {
        id: this.post.id,
        title,
        description,
      };
      this.store.dispatch(updatePost({post}));
      this.router.navigate(['posts'])
  }

  ngOnDestroy(): void {
    if(this.postSubscription){
      this.postSubscription.unsubscribe()
    }
  }


}

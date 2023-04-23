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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params)=>{
      const id = params.get('id');
      this.postSubscription = this.store
        .select(getPostById, {id})
        .subscribe((data)=> {
        this.post = data;
        this.createForm();
      })
    })
  }

  createForm(){
    this.postForm = new FormGroup({
      title: new FormControl(this.post.title, [
        Validators.required,
        Validators.minLength(6),
      ]),
      description: new FormControl(this.post.description, [
        Validators.required,
        Validators.minLength(6),
      ])
    })
  }

  onUpdatePost(){
    console.log(this.post.id, this.postForm.valid)
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
    this.postSubscription.unsubscribe()
  }


}

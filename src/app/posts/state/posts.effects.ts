import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {PostsService} from '../../services/posts.service'
import {addPost, loadPosts, loadPostsSuccess} from './post.action'
import {map, mergeMap} from 'rxjs'

@Injectable()
export class PostsEffects {
  constructor(private actions$: Actions, private postsService: PostsService) {
  }

  loadPosts$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loadPosts),
        mergeMap((action) => {
          return this.postsService.getPosts().pipe(
            map((posts) => {
              return loadPostsSuccess({posts})
            }),
          )
        }),
      )
    })

  addPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addPost),
      mergeMap((action) => {
        return this.postsService.addPost(action.post).pipe(
          map((data) => {
            console.log(data)
          }))
      }))
  }, {dispatch: false}
  );
}

import {createReducer, on} from '@ngrx/store'
import {initialState, postsAdapter} from './post.state'
import {addPostSuccess, deletePost, deletePostSuccess, loadPostsSuccess, updatePost} from './post.action'



const _postsReducer = createReducer(
  initialState,
  on(addPostSuccess, (state, action) => {
    return postsAdapter.addOne(action.post, state)

  }),
  on(updatePost, (state, action) => {
    return postsAdapter.upsertOne(action.post, state)
  }),
  on(deletePostSuccess, (state, {id}) => {
    return postsAdapter.removeOne(id, state)
  }),
  on(loadPostsSuccess, (state, action) => {
    return postsAdapter.setAll(action.posts, state)
  }),
)

export function postsReducer(state: any, action: any) {
  return _postsReducer(state, action)
}

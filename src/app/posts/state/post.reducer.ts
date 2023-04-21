import {createReducer, on} from '@ngrx/store'
import {initialState} from './post.state'
import {addPost, deletePost, loadPostsSuccess, updatePost} from './post.action'


const _postsReducer = createReducer(
  initialState,
  on(addPost, (state, action) => {
    let post = {...action.post}
    if (state.posts) {
      post.id = state.posts.length + 1
      return {
        ...state,
        posts: [...state.posts, post],
      }
    }
    return {
      ...state,
      posts: null,
    }
  }),
  on(updatePost, (state, action) => {
    if (state.posts) {
      const updatedPosts = state.posts.map((post) => {
        return action.post.id === post.id ? action.post : post
      })
      return {
        ...state,
        posts: updatedPosts,
      }
    }
    return {
      ...state,
      posts: null,
    }
  }),
  on(deletePost, (state, {id}) => {
    if (state.posts) {
      const updatedPosts = state.posts.filter((post) => {
        return post.id !== id
      })
      return {
        ...state,
        posts: updatedPosts,
      }
    }
    return {
      ...state,
      posts: null,
    }
  }),
  on(loadPostsSuccess, (state, action)=> {
    return {
      ...state,
      posts: action.posts,
    }
  })
)

export function postsReducer(state: any, action: any) {
  return _postsReducer(state, action)
}

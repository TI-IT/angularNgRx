import {createFeatureSelector, createSelector} from "@ngrx/store";
import {PostState} from "./post.state";
import {Post} from "../../models/posts.model";

const getPostsState = createFeatureSelector<PostState>('posts');

export const getPosts = createSelector(getPostsState, (state) => {
  return state.posts;
})

export const getPostById = createSelector(getPostsState, (state:any, props:any) => {
  return state.posts.find((post: any) => post.id === +props.id);
})

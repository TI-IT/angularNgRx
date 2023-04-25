import { createFeatureSelector, createSelector } from '@ngrx/store';
import {RouterStateUrl} from '../../store/router/custom-route-serializer'
import {postsAdapter, PostsState} from './post.state'
import {getCurrentRoute} from '../../store/router/router.selector'

export const POST_STATE_NAME = 'posts';
const getPostsState = createFeatureSelector<PostsState>(POST_STATE_NAME);
export const postsSelectors = postsAdapter.getSelectors();

export const getPosts = createSelector(getPostsState, postsSelectors.selectAll);
export const getPostEntities = createSelector(
  getPostsState,
  postsSelectors.selectEntities
);

export const getPostById = createSelector(
  getPostEntities,
  getCurrentRoute,
  (posts: any, route: RouterStateUrl) => {

    return posts ? posts[route.params['id']] : null;
  }
);

//подсчет голосов
export const getCount = createSelector(
  getPostsState, (state) => state.count);

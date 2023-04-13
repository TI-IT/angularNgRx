import {CounterState} from "../counter/state/counter.state";
import {PostState} from "../posts/state/post.state";
import {counterReducer} from "../counter/state/counter.reducer";
import {postsReducer} from "../posts/state/post.reducer";

export interface AppState {
  counter: CounterState;
  posts: PostState;
}

export const appReducer = {
  counter: counterReducer,
  posts: postsReducer,
}

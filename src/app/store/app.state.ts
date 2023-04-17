import {CounterState} from "../counter/state/counter.state";
import {PostState} from "../posts/state/post.state";
import {counterReducer} from "../counter/state/counter.reducer";
import {postsReducer} from "../posts/state/post.reducer";
import {SHARED_STATE_NAME} from "./shared/shared.selector";
import {SharedState} from "./shared/shared.state";
import {SharedReducer} from "./shared/shared.reducer";

export interface AppState {
  [SHARED_STATE_NAME]: SharedState;
}

export const appReducer = {
  [SHARED_STATE_NAME]: SharedReducer,
}

import {createReducer, on} from "@ngrx/store";
import {initialState} from "./counter.state";
import {customIncrement, decrement, increment, onChangeChannelName, reset} from "./counter.actions";


const _counterReducer = createReducer(
  initialState,
  on(increment, (state) => {
    return {
      ...state,
      counter: state.counter + 1,
    }
  }),
  on(decrement, (state) => {
    return {
      ...state,
      counter: state.counter - 1,
    }
  }),
  on(reset, (state) => {
    return {
      ...state,
      counter: 0,
    }
  }),
  on(customIncrement, (state, action)=>{
    return {
      ...state,
      counter: state.counter + +action.value,
    }
  }),
  on(onChangeChannelName, (state)=> {
    return {
      ...state,
      channelName: 'New chanal Name',
    }
  }),
)

export function counterReducer(state: any, action: any):{counter: number} {
  return _counterReducer(state, action)
}

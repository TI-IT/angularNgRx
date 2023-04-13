import {createFeatureSelector, createSelector} from "@ngrx/store";
import {CounterState} from "./counter.state";


const getCoutnerState = createFeatureSelector<CounterState>('counter');

export const getCounter = createSelector(getCoutnerState, state => {
  return state.counter;
})

export const getChannelName = createSelector(getCoutnerState, (state) => {
  return state.channelName;
})

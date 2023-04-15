import {createFeatureSelector, createSelector} from "@ngrx/store";
import {CounterState} from "./counter.state";

export const COUNTER_STATE_NAME = 'counter'

const getCoutnerState = createFeatureSelector<CounterState>(COUNTER_STATE_NAME);

export const getCounter = createSelector(getCoutnerState, state => {
  return state.counter;
})

export const getChannelName = createSelector(getCoutnerState, (state) => {
  return state.channelName;
})

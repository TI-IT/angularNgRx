import {createReducer, on} from "@ngrx/store";
import {initialState} from "./shared.state";
import {setErrorMessage, setLoadingSpiner} from "./shared.actions";


const _sharedReducer = createReducer(
  initialState,
  on(setLoadingSpiner, (state, action) => {
    return {
      ...state,
      showLoading: action.status,
    }
  }),
  on(setErrorMessage, (state, action) => {
    return {
      ...state,
      errorMessage: action.message,
    }
  }),
)

export function SharedReducer(state: any, action: any) {
  return _sharedReducer(state, action)
}

import {createAction, props} from "@ngrx/store";

export const SET_LOADING_ACTION = '[Shared state] set loading spinner';
export const SET_ERROR_MESSAGE = '[Shared state] set error message'
export const setLoadingSpiner = createAction(
  SET_LOADING_ACTION,
  props<{status: boolean}>()
);

export const setErrorMessage = createAction(
  SET_ERROR_MESSAGE,
  props<{message: string}>()
);

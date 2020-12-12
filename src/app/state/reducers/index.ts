import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';

import {
  initialState as userInitialState,
  reducer as userReducer,
} from './user.reducers';

export const initialState: State = {
  user: userInitialState,
};

/**
 * Console log actions for dev mode. Will be enabled through metaReducers when not in prod.
 * @param {ActionReducer<State>} reducer
 * @returns {ActionReducer<State>}
 */
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function(state: State, action: any): State {
    // tslint:disable-next-line
    console.log('state', state);
    // tslint:disable-next-line
    console.log('action', action);
    return reducer(state, action);
  };
}

export const reducers: ActionReducerMap<State> = {
  user: userReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger]
  : [];

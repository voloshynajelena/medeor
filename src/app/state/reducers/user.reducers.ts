import { Action, createReducer, on } from '@ngrx/store';
import { setUserData } from '../actions/user.actions';

const initialState: UserState = {
  user: {
    id: null,
  },
};

const userReducer = createReducer(
  initialState,
  on(
    setUserData,
    (state: UserState, { type, ...payload }: User & Action) => ({
      ...state,
      preferences: payload,
    })
  )
);

function reducer(state: UserState, action: Action) {
  return userReducer(state, action);
}

export { initialState, reducer };

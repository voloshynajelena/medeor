import { createSelector } from '@ngrx/store';

export const currentUserData =
  createSelector(
    (state: State) => state.user,
    (state: UserState) => state && state.user,
  );

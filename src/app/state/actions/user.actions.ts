import {createAction, props} from '@ngrx/store';
export const setUserData = createAction(
    '[User] SetUserData',
    props<UserStateId>()
);

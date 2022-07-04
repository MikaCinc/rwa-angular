import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { User } from '../models/user';
import * as UserActions from './user.actions';
import { state } from '@angular/animations';

export const usersFeatureKey = 'users';

export interface UserState {
  accessToken: string,
  user: User | null,
}

export const initialState: UserState = {
  accessToken: '',
  user: null,
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loginSuccess,
    (state, action) => ({ ...state, accessToken: action.data.access_token, user: action.data.user })
  ),
  on(UserActions.setTokenFromStorage,
    (state, action) => ({ ...state, accessToken: action.token })
  ),
  on(UserActions.getProfileSuccess,
    (state, action) => ({ ...state, user: action.user })
  ),
  on(UserActions.logout,
    (state, action) => ({ ...state, user: null, accessToken: '' })
  ),
);

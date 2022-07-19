import { createReducer, on } from '@ngrx/store';
import { User } from '../models/user';
import * as UserActions from './user.actions';
import * as PitanjaActions from './pitanje.action';

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
  on(UserActions.getProfileSuccess,
    (state, action) => ({ ...state, accessToken: action.token, user: action.user })
  ),
  on(UserActions.logout,
    (state, action) => ({ ...state, user: null, accessToken: '' })
  ),
  on(PitanjaActions.toggleFavouriteSuccess,
    (state, action) => ({ ...state, user: action.user })
  ),
);

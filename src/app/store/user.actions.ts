import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { LoginUser, User } from '../models/user';

export const loadUsers = createAction(
  '[User/API] Load Users',
  props<{ users: User[] }>()
);

export const loginUser = createAction(
  'loginUser',
  props<{ username: string, password: string }>()
);

export const loginSuccess = createAction(
  'loginSuccess',
  props<{ data: LoginUser }>()
);

export const setTokenFromStorage = createAction(
  'setTokenFromStorage',
  props<{ token: string }>()
);

export const getProfile = createAction(
  'getProfile',
  props<{ token: string }>()
);

export const getProfileSuccess = createAction(
  'getProfileSuccess',
  props<{ user: User }>()
);

export const addUser = createAction(
  '[User/API] Add User',
  props<{ user: User }>()
);

export const upsertUser = createAction(
  '[User/API] Upsert User',
  props<{ user: User }>()
);

export const addUsers = createAction(
  '[User/API] Add Users',
  props<{ users: User[] }>()
);

export const upsertUsers = createAction(
  '[User/API] Upsert Users',
  props<{ users: User[] }>()
);

export const updateUser = createAction(
  '[User/API] Update User',
  props<{ user: Update<User> }>()
);

export const updateUsers = createAction(
  '[User/API] Update Users',
  props<{ users: Update<User>[] }>()
);

export const deleteUser = createAction(
  '[User/API] Delete User',
  props<{ id: string }>()
);

export const deleteUsers = createAction(
  '[User/API] Delete Users',
  props<{ ids: string[] }>()
);

export const clearUsers = createAction(
  '[User/API] Clear Users'
);

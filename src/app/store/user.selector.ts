import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectUser = createSelector(
    (state: AppState) => state.user,
    (state) => state.user
);

export const selectUserFavourites = createSelector(
    (state: AppState) => state.user,
    (state) => state.user?.favourites
);

export const selectUserFavouritesIDs = createSelector(
    selectUserFavourites,
    (favourites) => favourites?.map(favourite => favourite.id)
);

export const selectToken = createSelector(
    (state: AppState) => state.user,
    (state) => state.accessToken
);
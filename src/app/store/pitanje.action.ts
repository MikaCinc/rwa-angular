import { createAction, props } from '@ngrx/store';
import { QuestionTypeEnum } from '../enums';
import { Pitanje } from '../models/pitanje';
import { User } from '../models/user';

export const loadPitanja = createAction('Load Pitanja');
export const loadFeaturedPitanja = createAction('loadFeaturedPitanja');
export const loadUserFavourites = createAction(
  'loadUserFavourites',
  props<{ pitanja: Pitanje[] }>()
);
export const loadPitanjaByCategory = createAction(
  'Load Pitanja By Category',
  props<{ categoryId: number }>()
);
export const loadPitanjaSuccess = createAction(
  'Load Pitanja Success',
  props<{ pitanja: Pitanje[] }>()
);
export const loadSinglePitanje = createAction(
  'Load single pitanje',
  props<{ id: number }>()
);
export const loadSinglePitanjeSuccess = createAction(
  'Load single pitanje success',
  props<{ pitanje: Pitanje }>()
);
export const selectPitanje = createAction(
  'Select pitanje',
  props<{ pitanjeId: number }>()
);
export const publishPitanje = createAction(
  'Publish pitanje',
  props<{
    text: string,
    qType: QuestionTypeEnum,
    answer: string,
    isCorrect: boolean,
    categories: number[]
  }>()
);
export const editPitanje = createAction(
  'Edit pitanje',
  props<{
    id: number,
    text: string,
    qType: QuestionTypeEnum,
    answer: string,
    isCorrect: boolean,
    categories: number[]
  }>()
);
export const publishPitanjeSuccess = createAction(
  'Publish Pitanje Success',
  props<{ pitanje: Pitanje }>()
);
export const editPitanjeSuccess = createAction(
  'Edit Pitanje Success',
  props<{ pitanje: Pitanje }>()
);
export const deletePitanje = createAction(
  'deletePitanje',
  props<{ id: number, token: string }>()
);
export const deletePitanjeSuccess = createAction(
  'deletePitanjeSuccess',
  props<{ id: number }>()
);
export const toggleFeatured = createAction(
  'toggleFeatured',
  props<{ id: number, token: string }>()
);
export const toggleFeaturedSuccess = createAction(
  'toggleFeaturedSuccess',
  props<{ pitanje: Pitanje }>()
);
export const toggleFavourite = createAction(
  'toggleFavourite',
  props<{ id: number, token: string }>()
);
export const toggleFavouriteSuccess = createAction(
  'toggleFavouriteSuccess',
  props<{ user: User }>()
);

/* export const ratePitanje = createAction(
  'Rate pitanje',
  props<{ pitanjeId: number; rating: PitanjeRating }>()
); */

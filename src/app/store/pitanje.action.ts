import { createAction, props } from '@ngrx/store';
import { Pitanje } from '../models/pitanje';

export const loadPitanja = createAction('Load Pitanja');
export const loadPitanjaByCategory = createAction(
  'Load Pitanja By Category',
  props<{ categoryId: number }>()
);
export const loadPitanjaSuccess = createAction(
  'Load Pitanja Success',
  props<{ pitanja: Pitanje[] }>()
);
export const selectPitanje = createAction(
  'Select pitanje',
  props<{ pitanjeId: number }>()
);

/* export const ratePitanje = createAction(
  'Rate pitanje',
  props<{ pitanjeId: number; rating: PitanjeRating }>()
); */

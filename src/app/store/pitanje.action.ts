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
  props<{ text: string, isCorrect: boolean, categories: number[] }>()
);
export const editPitanje = createAction(
  'Edit pitanje',
  props<{ id: number, text: string, isCorrect: boolean, categories: number[] }>()
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

/* export const ratePitanje = createAction(
  'Rate pitanje',
  props<{ pitanjeId: number; rating: PitanjeRating }>()
); */

import { createAction, props } from '@ngrx/store';
import { Kategorija } from '../models/kategorija';

export const loadKategorije = createAction('Load Kategorije');
export const loadKategorijeSuccess = createAction(
  'Load Kategorije Success',
  props<{ kategorije: Kategorija[] }>()
);
export const selectKategorija = createAction(
  'Select kategorija',
  props<{ kategorijaId: number }>()
);

export const loadSingleKategorija = createAction(
  'Load single kategorija',
  props<{ id: number }>()
);
export const loadSingleKategorijaSuccess = createAction(
  'Load single kategorija success',
  props<{ kategorija: Kategorija }>()
);

/* export const rateKategorija = createAction(
  'Rate kategorija',
  props<{ kategorijaId: number; rating: KategorijaRating }>()
); */

export const publishKategorija = createAction(
  'Publish kategorija',
  props<{ name: string }>()
);
export const editKategorija = createAction(
  'Edit kategorija',
  props<{ id: number, name: string }>()
);
export const publishKategorijaSuccess = createAction(
  'Publish Kategorija Success',
  props<{ kategorija: Kategorija }>()
);
export const editKategorijaSuccess = createAction(
  'Edit Kategorija Success',
  props<{ kategorija: Kategorija }>()
);
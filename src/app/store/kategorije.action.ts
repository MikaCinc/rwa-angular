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

/* export const rateKategorija = createAction(
  'Rate pitanje',
  props<{ pitanjeId: number; rating: KategorijaRating }>()
); */

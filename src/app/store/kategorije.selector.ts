import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { Kategorija } from '../models/kategorija';

export const selectPitanjaFeature = createSelector(
  (state: AppState) => state.kategorije,
  (kategorije) => kategorije
);

export const selectKategorijaIds = createSelector(
  selectPitanjaFeature,
  (kategorije) => kategorije.ids
);

export const selectKategorijasList = createSelector(selectPitanjaFeature, (kategorije) =>
  kategorije.ids
    .map((id) => kategorije.entities[id])
    .filter((kategorija) => kategorija != null)
    .map((kategorija) => <Kategorija>kategorija)
);

// export const selectKategorijasDict = createSelector(
//     selectPitanjaFeature,
//     (kategorije) => kategorije.list
// )

export const selectSelectedKategorijaId = createSelector(
  selectPitanjaFeature,
  (kategorije) => kategorije.selectedKategorija
);

export const selectSelectedKategorija = createSelector(
  selectPitanjaFeature,
  selectSelectedKategorijaId,
  (kategorije, kategorijaId) => kategorije.entities[kategorijaId]
);

import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { Kategorija } from '../models/kategorija';

export const selectKategorijeFeature = createSelector(
  (state: AppState) => state.kategorije,
  (kategorije) => kategorije
);

export const selectKategorijaIds = createSelector(
  selectKategorijeFeature,
  (kategorije) => kategorije.ids
);

export const selectKategorijasList = createSelector(
  selectKategorijeFeature,
  (kategorije) =>
    kategorije.ids
      .map((id) => kategorije.entities[id])
      .filter((kategorija) => kategorija != null)
      .map((kategorija) => <Kategorija>kategorija)
);

// export const selectKategorijasDict = createSelector(
//     selectKategorijeFeature,
//     (kategorije) => kategorije.list
// )

export const selectSelectedKategorijaId = createSelector(
  selectKategorijeFeature,
  (kategorije) => kategorije.selectedKategorija
);

export const selectSelectedKategorija = createSelector(
  selectKategorijeFeature,
  selectSelectedKategorijaId,
  (kategorije, kategorijaId) => kategorije.entities[kategorijaId]
);

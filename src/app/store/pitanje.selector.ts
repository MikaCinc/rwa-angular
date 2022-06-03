import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { Pitanje } from '../models/pitanje';

export const selectPitanjaFeature = createSelector(
  (state: AppState) => state.pitanja,
  (pitanja) => pitanja
);

export const selectPitanjeIds = createSelector(
  selectPitanjaFeature,
  (pitanja) => pitanja.ids
);

export const selectPitanjesList = createSelector(selectPitanjaFeature, (pitanja) =>
  pitanja.ids
    .map((id) => pitanja.entities[id])
    .filter((pitanje) => pitanje != null)
    .map((pitanje) => <Pitanje>pitanje)
);

// export const selectPitanjesDict = createSelector(
//     selectPitanjaFeature,
//     (pitanja) => pitanja.list
// )

export const selectSelectedPitanjeId = createSelector(
  selectPitanjaFeature,
  (pitanja) => pitanja.selectedPitanje
);

export const selectSelectedPitanje = createSelector(
  selectPitanjaFeature,
  selectSelectedPitanjeId,
  (pitanja, pitanjeId) => pitanja.entities[pitanjeId]
);

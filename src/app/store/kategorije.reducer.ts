import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Kategorija } from '../models/kategorija';
import * as Actions from './kategorije.action';

export interface KategorijaState extends EntityState<Kategorija> {
  selectedKategorija: number;
}

// export interface KategorijaStateOld {
//   list: Kategorija[],
//   selectedKategorija: number;
// }

const adapter = createEntityAdapter<Kategorija>();

export const initialState: KategorijaState = adapter.getInitialState({
  selectedKategorija: -1,
});

export const kategorijeReducer = createReducer(
  initialState,
  on(Actions.selectKategorija, (state, { kategorijaId }) => {
    console.log("selectKategorija", state)
    return {
      ...state,
      selectedKategorija: kategorijaId,
    };
  }),
  on(Actions.loadKategorijeSuccess, (state, { kategorije }) => {
    console.log("loadKategorijeSuccess", kategorije);
    return adapter.setAll(kategorije, state)
  }),
  on(Actions.loadSingleKategorijaSuccess, (state, { kategorija }) => {
    console.log("loadSinglePitanjeSuccess", kategorija);
    return adapter.setOne(kategorija, state)
  }),
  on(Actions.publishKategorijaSuccess, (state, { kategorija }) => {
    console.log("publishKategorijaSuccess in reducer", kategorija);
    return adapter.addOne(kategorija, state)
  }),
  on(Actions.editKategorijaSuccess, (state, { kategorija }) => {
    console.log("editKategorijaSuccess in reducer", kategorija);
    return adapter.setOne(kategorija, state)
  }),
  on(Actions.deleteCategorySuccess, (state, { id }) => {
    console.log("deleteCategorySuccess in reducer", id);
    return adapter.removeOne(id, state);
  }),
  /* on(Actions.rateSong, (state, { songId, rating }) =>
    adapter.updateOne(
      {
        id: songId,
        changes: {
          rating,
        },
      },
      state
    )
  ) */
  // on(Actions.addKategorija, (state, { song}) => {
  //   return adapter.addOne(song, state);
  // })
);

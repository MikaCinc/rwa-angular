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
    selectedKategorija: 0,
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
    }
    ),
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

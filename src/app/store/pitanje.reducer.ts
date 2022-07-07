import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Pitanje } from '../models/pitanje';
import * as Actions from './pitanje.action';

export interface PitanjeState extends EntityState<Pitanje> {
  selectedPitanje: number;
}

// export interface PitanjeStateOld {
//   list: Pitanje[],
//   selectedPitanje: number;
// }

const adapter = createEntityAdapter<Pitanje>();

export const initialState: PitanjeState = adapter.getInitialState({
  selectedPitanje: 0,
});

export const pitanjaReducer = createReducer(
  initialState,
  on(Actions.selectPitanje, (state, { pitanjeId }) => {
    console.log("selectPitanje", state)
    return {
      ...state,
      selectedPitanje: pitanjeId,
    };
  }),
  on(Actions.loadPitanjaSuccess, (state, { pitanja }) => {
    console.log("loadPitanjaSuccess", pitanja);
    return adapter.setAll(pitanja, state);
  }),
  on(Actions.loadSinglePitanjeSuccess, (state, { pitanje }) => {
    console.log("loadSinglePitanjeSuccess", pitanje);
    return adapter.setOne(pitanje, state);
  }),
  on(Actions.publishPitanjeSuccess, (state, { pitanje }) => {
    console.log("publishPitanjeSuccess in reducer", pitanje);
    return adapter.addOne(pitanje, state);
  }),
  on(Actions.editPitanjeSuccess, (state, { pitanje }) => {
    console.log("editPitanjeSuccess in reducer", pitanje);
    return adapter.setOne(pitanje, state);
  }),
  on(Actions.deletePitanjeSuccess, (state, { id }) => {
    console.log("deletePitanjeSuccess in reducer", id);
    return adapter.removeOne(id, state);
  }),
  on(Actions.toggleFeaturedSuccess, (state, { pitanje }) => {
    console.log("toggleFeaturedSuccess in reducer", pitanje);
    return adapter.updateOne({
      id: pitanje.id,
      changes: { isFeatured: pitanje.isFeatured },
    }, state);
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
  // on(Actions.addPitanje, (state, { song}) => {
  //   return adapter.addOne(song, state);
  // })
);

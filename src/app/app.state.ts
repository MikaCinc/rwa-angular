import { KategorijaState } from './store/kategorije.reducer';
import { PitanjeState } from './store/pitanje.reducer';

export interface AppState {
  pitanja: PitanjeState;
  kategorije: KategorijaState;
}

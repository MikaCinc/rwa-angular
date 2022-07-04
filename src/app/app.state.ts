import { KategorijaState } from './store/kategorije.reducer';
import { PitanjeState } from './store/pitanje.reducer';
import { UserState } from './store/user.reducer';

export interface AppState {
  pitanja: PitanjeState;
  kategorije: KategorijaState;
  user: UserState;
}

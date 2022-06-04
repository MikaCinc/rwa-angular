import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { KategorijaService } from '../services/kategorija.service';
import * as KategorijaActions from './kategorije.action';

@Injectable()
export class KategorijeEffects {
  constructor(private actions$: Actions, private kategorijaService: KategorijaService) { }
  loadKategorije$ = createEffect(() =>
    this.actions$.pipe(
      ofType(KategorijaActions.loadKategorije),
      mergeMap(() =>
        this.kategorijaService.getAll().pipe(
          map((res) => {
            if (res.success && res.data) return res.data;
            else throw new Error(res.message || "Nije uspašeno učitavanje kategorije");
          }),
          map((kategorije) => KategorijaActions.loadKategorijeSuccess({ kategorije })),
          catchError(() => of({ type: 'load error' }))
        )
      )
    )
  );
}

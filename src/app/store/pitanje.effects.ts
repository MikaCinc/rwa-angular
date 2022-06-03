import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { PitanjeService } from '../services/pitanje.service';
import * as PitanjeActions from './pitanje.action';

@Injectable()
export class PitanjaEffects {
  constructor(private actions$: Actions, private pitanjeService: PitanjeService) { }
  loadPitanja$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PitanjeActions.loadPitanja),
      mergeMap(() =>
        this.pitanjeService.getAll().pipe(
          map((res) => {
            if (res.success && res.data) return res.data;
            else throw new Error(res.message || "Nije uspašeno učitavanje pitanja");
          }),
          map((pitanja) => PitanjeActions.loadPitanjaSuccess({ pitanja })),
          catchError(() => of({ type: 'load error' }))
        )
      )
    )
  );
}

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { KategorijaService } from '../services/kategorija.service';
import * as KategorijaActions from './kategorije.action';

@Injectable()
export class KategorijeEffects {
  constructor(
    private actions$: Actions,
    private kategorijaService: KategorijaService,
    private _snackBar: MatSnackBar
  ) { }
  
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
  publishKategorija$ = createEffect(() =>
    this.actions$.pipe(
      ofType(KategorijaActions.publishKategorija),
      mergeMap(({ name }) =>
        this.kategorijaService.publishKategorija(name).pipe(
          map((res) => {
            if (res.success && res.data) return res.data;
            else throw new Error(res.message || "Nije uspešno kreiranje kategorije");
          }),
          map((kategorija) => {
            this._snackBar.open("Uspešno kreirana kategorija!", "Zatvori", { duration: 3000 });
            return KategorijaActions.publishKategorijaSuccess({ kategorija })
          }),
          catchError(() => of({ type: 'load error' }))
        )
      )
    )
  );
  editKategorija$ = createEffect(() =>
    this.actions$.pipe(
      ofType(KategorijaActions.editKategorija),
      mergeMap(({ id, name }) =>
        this.kategorijaService.editKategorija(id, name).pipe(
          map((res) => {
            if (res.success && res.data) return res.data;
            else throw new Error(res.message || "Nije uspešno ažuriranje kategorije");
          }),
          map((kategorija) => {
            this._snackBar.open("Uspešno ažurirana kategorija!", "Zatvori", { duration: 3000 });
            return KategorijaActions.editKategorijaSuccess({ kategorija })
          }),
          catchError(() => of({ type: 'load error' }))
        )
      )
    )
  );
}

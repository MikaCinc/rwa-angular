import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, delay, map, mergeMap, of } from 'rxjs';
import { PitanjeService } from '../services/pitanje.service';
import * as PitanjeActions from './pitanje.action';

@Injectable()
export class PitanjaEffects {
  constructor(
    private actions$: Actions,
    private pitanjeService: PitanjeService,
    private _snackBar: MatSnackBar
  ) { }

  loadPitanja$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PitanjeActions.loadPitanja),
      mergeMap(() =>
        this.pitanjeService.getAll().pipe(
          delay(1000),
          map((res) => {
            if (res.success && res.data) return res.data;
            else throw new Error(res.message || "Nije uspešno učitavanje pitanja");
          }),
          map((pitanja) => {
            return PitanjeActions.loadPitanjaSuccess({ pitanja })
          }),
          catchError(() => of({ type: 'load error' }))
        )
      )
    )
  );
  loadFeaturedPitanja$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PitanjeActions.loadFeaturedPitanja),
      mergeMap(() =>
        this.pitanjeService.getAllFeatured().pipe(
          delay(1000),
          map((res) => {
            if (res.success && res.data) return res.data;
            else throw new Error(res.message || "Nije uspešno učitavanje pitanja");
          }),
          map((pitanja) => {
            return PitanjeActions.loadPitanjaSuccess({ pitanja })
          }),
          catchError(() => of({ type: 'load error' }))
        )
      )
    )
  );
  loadSinglePitanje$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PitanjeActions.loadSinglePitanje),
      mergeMap(({ id }) =>
        this.pitanjeService.getSingle(id).pipe(
          map((res) => {
            if (res.success && res.data) return res.data;
            else throw new Error(res.message || "Nije uspešno učitavanje pitanja");
          }),
          map((pitanje) => PitanjeActions.loadSinglePitanjeSuccess({ pitanje })),
          catchError(() => of({ type: 'load error' }))
        )
      )
    )
  );
  loadPitanjaByCategory$ = createEffect(() =>
    this.actions$.pipe(
      delay(1000),
      ofType(PitanjeActions.loadPitanjaByCategory),
      mergeMap(({ categoryId }) =>
        this.pitanjeService.getAllByCategory(categoryId).pipe(
          map((res) => {
            if (res.success && res.data) return res.data;
            else throw new Error(res.message || "Nije uspešno učitavanje pitanja");
          }),
          map((pitanja) => PitanjeActions.loadPitanjaSuccess({ pitanja })),
          catchError(() => of({ type: 'load error' }))
        )
      )
    )
  );
  publishPitanje$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PitanjeActions.publishPitanje),
      mergeMap(({ text, qType, answer, isCorrect, categories }) =>
        this.pitanjeService.publishPitanje(text, qType, answer, isCorrect, categories).pipe(
          map((res) => {
            if (res.success && res.data) return res.data;
            else throw new Error(res.message || "Nije uspešno kreiranje pitanja");
          }),
          map((pitanje) => {
            this._snackBar.open("Uspešno kreirano pitanje!", "Zatvori", { duration: 3000 });
            return PitanjeActions.publishPitanjeSuccess({ pitanje });
          }),
          catchError(() => of({ type: 'load error' }))
        )
      )
    )
  );
  editPitanje$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PitanjeActions.editPitanje),
      mergeMap(({ id, text, qType, answer, isCorrect, categories }) =>
        this.pitanjeService.editPitanje(id, text, qType, answer, isCorrect, categories).pipe(
          map((res) => {
            if (res.success && res.data) return res.data;
            else throw new Error(res.message || "Nije uspešno ažuriranje pitanja");
          }),
          map((pitanje) => {
            this._snackBar.open("Uspešno ažurirano pitanje!", "Zatvori", { duration: 3000 });
            return PitanjeActions.editPitanjeSuccess({ pitanje });
          }),
          catchError(() => of({ type: 'load error' }))
        )
      )
    )
  );
  deletePitanje$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PitanjeActions.deletePitanje),
      mergeMap(({ id, token }) =>
        this.pitanjeService.deletePitanje(id, token).pipe(
          map((res) => {
            if (res.success && res.data) return res.data;
            else throw new Error(res.message || "Nije uspešno izbrisano pitanje");
          }),
          map((success) => {
            this._snackBar.open("Uspešno izbrisano pitanje!", "Zatvori", { duration: 3000 });
            return PitanjeActions.deletePitanjeSuccess({ id });
          }),
          catchError(() => of({ type: 'load error' }))
        )
      )
    )
  );
  toggleFeatured$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PitanjeActions.toggleFeatured),
      mergeMap(({ id, token }) =>
        this.pitanjeService.toggleFeatured(id, token).pipe(
          map((res) => {
            if (res.success && res.data) return res.data;
            else throw new Error(res.message || "Nije uspešno promenjena istaknutost pitanja");
          }),
          map((pitanje) => {
            this._snackBar.open("Uspešno promenjena istaknutost pitanja!", "Zatvori", { duration: 3000 });
            return PitanjeActions.toggleFeaturedSuccess({ pitanje });
          }),
          catchError(() => of({ type: 'load error' }))
        )
      )
    )
  );
  toggleFavourite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PitanjeActions.toggleFavourite),
      mergeMap(({ id, token }) =>
        this.pitanjeService.toggleFavourite(id, token).pipe(
          map((res) => {
            if (res.success && res.data) return res.data;
            else throw new Error(res.message || "Nije uspešno promenjena favoritnost pitanja");
          }),
          map((user) => {
            this._snackBar.open("Uspešno promenjena favoritnost pitanja!", "Zatvori", { duration: 3000 });
            return PitanjeActions.toggleFavouriteSuccess({ user });
          }),
          catchError(() => of({ type: 'load error' }))
        )
      )
    )
  );
}

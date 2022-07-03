import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../services/user.service';
import * as UserActions from './user.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { LoginUser } from '../models/user';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) { }

  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loginUser),
      mergeMap(({ username, password }) =>
        this.userService.login(username, password).pipe(
          map((res) => {
            if (res.success && res.data) return res.data;
            else throw new Error(res.message || "Nije uspešan login");
          }),
          map((data: LoginUser) => {
            this._snackBar.open("Uspešno ulogovan!", "Zatvori", { duration: 3000 });
            return UserActions.loginSuccess({ data });
          }),
          catchError(() => of({ type: 'login error' }))
        )
      )
    )
  );
}

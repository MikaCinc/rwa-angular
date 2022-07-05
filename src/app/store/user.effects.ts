import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../services/user.service';
import * as UserActions from './user.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { LoginUser, User } from '../models/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private router: Router,
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
            this._snackBar.open(`Uspešno ulogovan ${data.user.username}!`, "Zatvori", { duration: 3000 });
            this.router.navigate(['/']);
            localStorage.setItem('token', data.access_token);
            UserActions.setTokenFromStorage({ token: data.access_token });
            return UserActions.loginSuccess({ data });
          }),
          catchError(({ message }) => {
            this._snackBar.open(`${message}`, "Zatvori", { duration: 3000 })
            return of({ type: 'login error' })
          }),
        )
      )
    )
  );

  registerUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.registerUser),
      mergeMap(({ username, password, email }) =>
        this.userService.register(username, password, email).pipe(
          map((res) => {
            if (res.success && res.data) return res.data;
            else throw new Error(res.message || "Nije uspešan register");
          }),
          map((data: LoginUser) => {
            this._snackBar.open(`Uspešno registrovan ${data.user.username}!`, "Zatvori", { duration: 3000 });
            this.router.navigate(['/']);
            localStorage.setItem('token', data.access_token);
            UserActions.setTokenFromStorage({ token: data.access_token });
            return UserActions.loginSuccess({ data });
          }),
          catchError(({ message }) => {
            this._snackBar.open(`${message}`, "Zatvori", { duration: 3000 })
            return of({ type: 'register error' })
          }),
        )
      )
    )
  );

  getProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getProfile),
      mergeMap(({ token }) =>
        this.userService.me(token).pipe(
          map((res) => {
            if (res.success && res.data) return res.data;
            else throw new Error(res.message || "Nije uspešan /me");
          }),
          map((user: User) => {
            console.log("/me", user);

            this._snackBar.open(`Uspešno ulogovan ${user.username}!`, "Zatvori", { duration: 3000 });
            return UserActions.getProfileSuccess({ user, token });
          }),
          catchError(() => of({ type: 'login error' }))
        )
      )
    )
  );
}

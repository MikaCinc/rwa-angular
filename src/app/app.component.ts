import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from './app.state';
import { User } from './models/user';
import { getProfile, logout } from './store/user.actions';
import { selectUser } from './store/user.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '17743-pitanja';
  user$: Observable<User | null> = of(null);

  constructor(private store: Store<AppState>, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.store.dispatch(getProfile({ token }));
    }

    this.user$ = this.store.select(selectUser);
  }

  handleLogout() {
    localStorage.removeItem('token');
    this.store.dispatch(logout());
    this._snackBar.open("Uspešno ste se odjavili", "Zatvori", {
      duration: 3000,
    });
  }
}

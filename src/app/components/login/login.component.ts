import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { loginUser } from 'src/app/store/user.actions';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = 'mikac_inc';
  password = 'inicijativa';

  constructor(
    private store: Store<AppState>,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  reset() {
    this.username = '';
    this.password = '';
  }

  submit() {
    this.store.dispatch(loginUser({
      username: this.username,
      password: this.password
    }));

    /* fetch(environment.api + `/auth/login`, {
      method: 'POST',
      // credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: this.username,
        password: this.password
      })
    }).then(res => res.json())
      .then(res => {
        console.log(res);

        if (res.success) {
          this._snackBar.open("Uspešan login", "Zatvori", {
            duration: 3000,
            panelClass: [`snack-success`]
          });
        } else {
          this._snackBar.open(res.message, "Zatvori", {
            duration: 3000,
            panelClass: [`snack-error`]
          });
        }
      }) */
  }

}

import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { loginUser, registerUser } from 'src/app/store/user.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username = 'mikac_inc';
  password = 'inicijativa';
  email = 'mihajlo.ls00@outlook.com';

  selectedTab: number = 0;
  isRegister: boolean = false;

  constructor(
    private store: Store<AppState>,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const paramTab = Number(this.route.snapshot.queryParamMap.get('tab')) || -1;
    console.log("tab", paramTab);
    if ([0, 1].includes(paramTab)) {
      this.selectedTab = paramTab;
      this.isRegister = paramTab === 1;
    }
  }

  reset() {
    this.username = '';
    this.password = '';
    this.email = '';
  }

  selectedTabChange(event: number) {
    this.selectedTab = event;
    if (event === 0) {
      this.isRegister = false;
    } else if (event === 1) {
      this.isRegister = true;
    }
  }

  submit() {
    if (!this.username || !this.password) return;

    if (this.isRegister) {
      if (!this.email) return;

      this.store.dispatch(registerUser({
        username: this.username,
        password: this.password,
        email: this.email
      }));
    } else {
      this.store.dispatch(loginUser({
        username: this.username,
        password: this.password
      }));
    }
  }

}

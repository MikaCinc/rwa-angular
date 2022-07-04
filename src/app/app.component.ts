import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { getProfile } from './store/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '17743-pitanja';

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.store.dispatch(getProfile({ token }));
    }
  }
}

import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from './app.state';
import { SpecialCategoryValuesEnum } from './enums';
import { User } from './models/user';
import { selectKategorija } from './store/kategorije.action';
import { loadFeaturedPitanja, loadPitanja } from './store/pitanje.action';
import { getProfile, logout } from './store/user.actions';
import { selectUser } from './store/user.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '17743-pitanja';
  /* Drawer */
  @ViewChild('drawer')
  drawer!: MatDrawer;
  isExpandedDrawer: boolean = false;

  user$: Observable<User | null> = of(null);

  constructor(
    private store: Store<AppState>,
    private _snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.store.dispatch(getProfile({ token }));
    }

    this.user$ = this.store.select(selectUser);
  }

  ngAfterViewInit() {
    this.drawer.open();
  }

  handleLogout() {
    localStorage.removeItem('token');
    this.store.dispatch(logout());
    this._snackBar.open("Uspešno ste se odjavili", "Zatvori", {
      duration: 3000,
    });
  }

  goToFeatured() {
    this.store.dispatch(selectKategorija({ kategorijaId: SpecialCategoryValuesEnum.FEATURED }));
    this.store.dispatch(loadFeaturedPitanja());
    this.router.navigate(['/']);
  }

  goToAll() {
    this.store.dispatch(selectKategorija({ kategorijaId: SpecialCategoryValuesEnum.ALL }));
    this.store.dispatch(loadPitanja());
    this.router.navigate(['/']);
  }
}

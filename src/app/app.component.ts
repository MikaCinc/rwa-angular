import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of, take } from 'rxjs';
import { AppState } from './app.state';
import { SpecialCategoryValuesEnum } from './enums';
import { User } from './models/user';
import { ThemeService } from './services/theme.service';
import { selectKategorija } from './store/kategorije.action';
import { loadFeaturedPitanja, loadPitanja, loadUserFavourites } from './store/pitanje.action';
import { getProfile, logout } from './store/user.actions';
import { selectUser } from './store/user.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = '17743-pitanja';
  /* Drawer */
  @ViewChild('drawer')
  drawer!: MatDrawer;
  isExpandedDrawer: boolean = false;
  isDarkMode: boolean = false;

  user$: Observable<User | null> = of(null);

  constructor(
    private store: Store<AppState>,
    private _snackBar: MatSnackBar,
    private router: Router,
    private themeService: ThemeService
  ) {
    this.themeService.initTheme();
    this.isDarkMode = this.themeService.isDarkMode();
  }

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

  toggleTheme() {
    this.isDarkMode
      ? this.themeService.update('light-mode')
      : this.themeService.update('dark-mode');

    this.isDarkMode = this.themeService.isDarkMode();
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

  goToFavourites() {
    this.store.dispatch(selectKategorija({ kategorijaId: SpecialCategoryValuesEnum.FAVOURITES }));

    let favourites;
    this.store.pipe(take(1)).subscribe(s => favourites = s.user?.user?.favourites);
    this.store.dispatch(loadUserFavourites({ pitanja: favourites || [] }));

    this.router.navigate(['/']);
  }
}

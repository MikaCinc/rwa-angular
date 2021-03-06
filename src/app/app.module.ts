import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppState } from './app.state';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DeleteDialog, KategorijeComponent } from './components/kategorije/kategorije.component';
import { PitanjaEffects } from './store/pitanje.effects';
import { kategorijeReducer } from './store/kategorije.reducer';
import { pitanjaReducer } from './store/pitanje.reducer';
import { SetPitanjaComponent } from './components/set-pitanja/set-pitanja.component';
import { PitanjeComponent, InfoDialog } from './components/pitanje/pitanje.component';
import { KategorijeEffects } from './store/kategorije.effects';
import { HomeComponent } from './components/home/home.component';
import { UserEffects } from './store/user.effects';
import { userReducer } from './store/user.reducer';
import { LoginComponent } from './components/login/login.component';

/* Material UI */
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { PitanjeEditorComponent } from './components/pitanje-editor/pitanje-editor.component';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { KategorijaEditorComponent } from './components/kategorija-editor/kategorija-editor.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@NgModule({
  declarations: [
    AppComponent,
    PitanjeComponent,
    InfoDialog,
    SetPitanjaComponent,
    KategorijeComponent,
    DeleteDialog,
    HomeComponent,
    PitanjeEditorComponent,
    KategorijaEditorComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot<AppState>({ pitanja: pitanjaReducer, kategorije: kategorijeReducer, user: userReducer }),
    EffectsModule.forRoot([PitanjaEffects, KategorijeEffects, UserEffects]),
    BrowserAnimationsModule,
    /* Material UI */
    MatSliderModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatMenuModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatButtonToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

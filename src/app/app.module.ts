import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppState } from './app.state';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { KategorijeComponent } from './components/kategorije/kategorije.component';
import { PitanjaEffects } from './store/pitanje.effects';
import { kategorijeReducer } from './store/kategorije.reducer';
import { pitanjaReducer } from './store/pitanje.reducer';
import { SetPitanjaComponent } from './components/set-pitanja/set-pitanja.component';
import { PitanjeComponent } from './components/pitanje/pitanje.component';
import { KategorijeEffects } from './store/kategorije.effects';
import { HomeComponent } from './components/home/home.component';

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

@NgModule({
  declarations: [
    AppComponent,
    PitanjeComponent,
    SetPitanjaComponent,
    KategorijeComponent,
    HomeComponent,
    PitanjeEditorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot<AppState>({ pitanja: pitanjaReducer, kategorije: kategorijeReducer }),
    EffectsModule.forRoot([PitanjaEffects, KategorijeEffects]),
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
    MatDividerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

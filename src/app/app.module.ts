import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PitanjeComponent } from './pitanje/pitanje.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppState } from './app.state';
import { PitanjaEffects } from './store/pitanje.effects';
import { pitanjaReducer } from './store/pitanje.reducer';
import { HttpClientModule } from '@angular/common/http';
import { SetPitanjaComponent } from './set-pitanja/set-pitanja.component';

@NgModule({
  declarations: [
    AppComponent,
    PitanjeComponent,
    SetPitanjaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot<AppState>({ pitanja: pitanjaReducer }),
    EffectsModule.forRoot([PitanjaEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { KategorijaEditorComponent } from './components/kategorija-editor/kategorija-editor.component';
import { LoginComponent } from './components/login/login.component';
import { PitanjeEditorComponent } from './components/pitanje-editor/pitanje-editor.component';

const baseTitle = "17743 - RWA";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'pitanje-editor', component: PitanjeEditorComponent },
  { path: 'kategorija-editor', component: KategorijaEditorComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

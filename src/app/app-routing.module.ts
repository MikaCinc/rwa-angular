import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PitanjeEditorComponent } from './components/pitanje-editor/pitanje-editor.component';

const baseTitle = "17743 - RWA";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'pitanje-editor', component: PitanjeEditorComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

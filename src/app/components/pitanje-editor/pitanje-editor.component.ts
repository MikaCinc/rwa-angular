import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { Kategorija } from 'src/app/models/kategorija';
import { loadKategorije } from 'src/app/store/kategorije.action';
import { selectKategorijasList } from 'src/app/store/kategorije.selector';

@Component({
  selector: 'app-pitanje-editor',
  templateUrl: './pitanje-editor.component.html',
  styleUrls: ['./pitanje-editor.component.css']
})
export class PitanjeEditorComponent implements OnInit {
  value = '';
  isCorrect = true;
  categories: number[] = [];

  kategorije$: Observable<Kategorija[]> = of([]);

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(loadKategorije());
    this.kategorije$ = this.store.select(selectKategorijasList);
  }

  izborKategorije(kategorija: Kategorija) {
    let isIncluded = this.categories.includes(kategorija.id);
    if (isIncluded) {
      this.categories = this.categories.filter(x => x !== kategorija.id);
    } else {
      this.categories.push(kategorija.id);
    }
  }

  reset() {
    this.value = '';
    this.isCorrect = true;
    this.categories = [];
  }

}

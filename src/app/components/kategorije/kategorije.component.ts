import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Kategorija } from 'src/app/models/kategorija';
import { loadKategorije, selectKategorija } from 'src/app/store/kategorije.action';
import { selectKategorijasList, selectSelectedKategorijaId } from 'src/app/store/kategorije.selector';
import { AppState } from '../../app.state';

@Component({
  selector: 'app-kategorije',
  templateUrl: './kategorije.component.html',
  styleUrls: ['./kategorije.component.css']
})
export class KategorijeComponent implements OnInit {

  kategorije$: Observable<Kategorija[]> = of([]);
  selectedKategorijaId$: Observable<number> = of(-1);

  constructor(private store: Store<AppState>) { }

  title = 'Kategorije';

  ngOnInit(): void {
    this.store.dispatch(loadKategorije());
    this.kategorije$ = this.store.select(selectKategorijasList);
    this.selectedKategorijaId$ = this.store.select(selectSelectedKategorijaId);
  }

  selectKategorija(kategorija: Kategorija) {
    console.log("selectKategorija in component", kategorija);

    this.store.dispatch(
      selectKategorija({
        kategorijaId: kategorija.id,
      })
    );
  }

  promenaKategorija(kat: Kategorija) {
    console.log("promenaKategorija in component", kat);
    this.selectedKategorijaId$ = of(kat.id);
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, Observable, of } from 'rxjs';
import { Kategorija } from 'src/app/models/kategorija';
import { selectKategorija } from 'src/app/store/kategorije.action';
import { selectKategorijasList, selectSelectedKategorijaId } from 'src/app/store/kategorije.selector';
import { AppState } from '../../app.state';
import { Pitanje } from '../../models/pitanje';
import { loadPitanja, loadPitanjaByCategory, selectPitanje } from '../../store/pitanje.action';
import { selectPitanjesList } from '../../store/pitanje.selector';

export interface PitanjeValidacija extends Pitanje {
  guess: boolean;
}

@Component({
  selector: 'app-pitanje',
  templateUrl: './pitanje.component.html',
  styleUrls: ['./pitanje.component.css']
})
export class PitanjeComponent implements OnInit {
  @Input() pitanje: Pitanje | null = null;
  // @Output() onClick: EventEmitter<Pitanje> = new EventEmitter<Pitanje>();
  @Output() submit: EventEmitter<PitanjeValidacija> = new EventEmitter<PitanjeValidacija>();
  // pitanje$: Observable<Pitanje> = of();

  selectedKategorijaId$: Observable<number> = of(0);
  kategorije$: Observable<Kategorija[]> = of([]);

  constructor(private router: Router, private store: Store<AppState>) { }

  title = 'Pitanje';

  ngOnInit(): void {
    /* this.store.dispatch(loadPitanja());
    this.pitanja$ = this.store.select(selectPitanjesList); */
    this.kategorije$ = this.store.select(selectKategorijasList).pipe(
      map(all => all.filter(single => this.pitanje?.categories.includes(single.id)))
    );
    this.selectedKategorijaId$ = this.store.select(selectSelectedKategorijaId);
  }

  validacija(guess: boolean) {
    if (!this.pitanje) return;
    const objToSend = {
      ...this.pitanje,
      guess
    }
    this.submit.emit(objToSend);
  }

  promenaKategorija(kat: Kategorija) {
    console.log("promenaKategorija in pitanje component", kat);
    /* this.selectedKategorijaId$ = of(kat.id); */
    this.store.dispatch(
      selectKategorija({
        kategorijaId: kat.id,
      })
    );

    this.store.dispatch(loadPitanjaByCategory({
      categoryId: kat.id,
    }));
  }

  /* selectPitanje(pitanje: Pitanje) {
    console.log("selectPitanje", pitanje);

    this.store.dispatch(
      selectPitanje({
        pitanjeId: pitanje.id,
      })
    );
  } */

  gotoEdit() {
    const pitanjeId = this.pitanje ? this.pitanje.id : null;
    this.router.navigate(['/pitanje-editor', { id: pitanjeId }]);
  }
}

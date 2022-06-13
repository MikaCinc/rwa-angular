import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of, switchMap } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { Kategorija } from 'src/app/models/kategorija';
import { Pitanje } from 'src/app/models/pitanje';
import { loadKategorije } from 'src/app/store/kategorije.action';
import { selectKategorijasList } from 'src/app/store/kategorije.selector';
import { editPitanje, publishPitanje, selectPitanje } from 'src/app/store/pitanje.action';
import { selectSelectedPitanje, selectSelectedPitanjeId } from 'src/app/store/pitanje.selector';

@Component({
  selector: 'app-pitanje-editor',
  templateUrl: './pitanje-editor.component.html',
  styleUrls: ['./pitanje-editor.component.css']
})
export class PitanjeEditorComponent implements OnInit {
  isEdit: boolean = false;
  pitanjeIdToEdit: number = -1;
  pitanjeToEdit$: Observable<Pitanje | undefined> = of(undefined);

  value = '';
  isCorrect = true;
  categories: number[] = [];

  kategorije$: Observable<Kategorija[]> = of([]);

  constructor(private route: ActivatedRoute, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(loadKategorije());
    this.kategorije$ = this.store.select(selectKategorijasList);

    const paramId = Number(this.route.snapshot.paramMap.get('id')) || -1;
    if (paramId !== -1) this.isEdit = true;
    else return;
    this.pitanjeIdToEdit = paramId;
    this.store.dispatch(selectPitanje({ pitanjeId: paramId }));
    console.log("paramId", paramId);

    const pitanje = this.store.select(selectSelectedPitanje);
    pitanje.subscribe(x => {
      console.log("hererer", x); // @todo: unsubscribe

      if (!x || !x.id || x.id !== this.pitanjeIdToEdit) return;
      this.isCorrect = x.isCorrect;
      this.value = x.text;
      this.categories = x.categories;
    });

    this.pitanjeToEdit$ = pitanje;

    // edit
    /* this.pitanjeToEdit$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.pitanjeIdToEdit = Number(params.get('id'));
        if (this.pitanjeIdToEdit !== -1) this.isEdit = true;
        this.store.dispatch(selectPitanje({ pitanjeId: this.pitanjeIdToEdit }));
        console.log(this.pitanjeIdToEdit);

        const pitanje = this.store.select(selectSelectedPitanje);
        pitanje.subscribe(x => {
          if (!x || !x.id || x.id !== this.pitanjeIdToEdit) return;
          this.isCorrect = x.isCorrect;
          this.value = x.text;
          this.categories = x.categories;
        });
        return pitanje;
      })
    ); */
  }

  izborKategorije(kategorija: Kategorija) {
    let isIncluded = this.categories.includes(kategorija.id);
    console.log("isIncluded", isIncluded);

    if (isIncluded) {
      this.categories = this.categories.filter(x => x !== kategorija.id);
    } else {
      this.categories = [...this.categories, kategorija.id];
    }
  }

  reset() {
    this.value = '';
    this.isCorrect = true;
    this.categories = [];
  }

  publish() {
    if (this.isEdit) {
      this.store.dispatch(editPitanje({
        id: this.pitanjeIdToEdit,
        text: this.value,
        isCorrect: this.isCorrect,
        categories: this.categories
      }));
    } else {
      this.store.dispatch(publishPitanje({
        text: this.value,
        isCorrect: this.isCorrect,
        categories: this.categories
      }));
    }
  }

}

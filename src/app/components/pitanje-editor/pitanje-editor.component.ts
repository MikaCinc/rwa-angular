import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of, Subscription } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { QuestionTypeEnum } from 'src/app/enums';
import { Kategorija } from 'src/app/models/kategorija';
import { Pitanje } from 'src/app/models/pitanje';
import { loadKategorije } from 'src/app/store/kategorije.action';
import { selectKategorijasList } from 'src/app/store/kategorije.selector';
import { editPitanje, loadSinglePitanje, publishPitanje, selectPitanje } from 'src/app/store/pitanje.action';
import { selectSelectedPitanje } from 'src/app/store/pitanje.selector';

@Component({
  selector: 'app-pitanje-editor',
  templateUrl: './pitanje-editor.component.html',
  styleUrls: ['./pitanje-editor.component.scss']
})
export class PitanjeEditorComponent implements OnInit {
  isEdit: boolean = false;
  pitanjeIdToEdit: number = -1;
  pitanjeToEdit$: Observable<Pitanje | undefined> = of(undefined);
  pitanjeToEditSubscription$: Subscription = new Subscription;

  value = '';
  type: QuestionTypeEnum = QuestionTypeEnum.BOOL;
  answer: string = '';
  isCorrect = true;
  categories: number[] = [];

  kategorije$: Observable<Kategorija[]> = of([]);

  constructor(private route: ActivatedRoute, private store: Store<AppState>, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.store.dispatch(loadKategorije());
    this.kategorije$ = this.store.select(selectKategorijasList);

    const paramId = Number(this.route.snapshot.paramMap.get('id')) || -1;
    if (paramId !== -1) this.isEdit = true;
    else return;
    this.pitanjeIdToEdit = paramId;
    this.store.dispatch(selectPitanje({ pitanjeId: paramId }));
    console.log("paramId", paramId);

    this.pitanjeToEdit$ = this.store.select(selectSelectedPitanje);
    this.pitanjeToEditSubscription$ = this.pitanjeToEdit$.subscribe(x => {
      console.log("hererer", x);
      if (!x) {
        this.store.dispatch(loadSinglePitanje({ id: paramId }));
      }

      if (!x || !x.id || x.id !== this.pitanjeIdToEdit) return;
      this.isCorrect = x.isCorrect;
      this.value = x.text;
      this.categories = x.categories;
      this.type = x.type;
      this.answer = x.answer;
    });
  }

  ngOnDestroy() {
    this.pitanjeToEditSubscription$.unsubscribe();
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
    this.answer = '';
  }

  publish() {
    if (this.isEdit) {
      this.store.dispatch(editPitanje({
        id: this.pitanjeIdToEdit,
        text: this.value,
        qType: this.type,
        answer: this.answer,
        isCorrect: this.isCorrect,
        categories: this.categories
      }));
    } else {
      this.store.dispatch(publishPitanje({
        text: this.value,
        qType: this.type,
        answer: this.answer,
        isCorrect: this.isCorrect,
        categories: this.categories
      }));
    }
  }

}

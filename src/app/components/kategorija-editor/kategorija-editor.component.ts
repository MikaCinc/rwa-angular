import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of, Subscription } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { Kategorija } from 'src/app/models/kategorija';
import { editKategorija, loadKategorije, loadSingleKategorija, publishKategorija, selectKategorija } from 'src/app/store/kategorije.action';
import { selectKategorijasList, selectSelectedKategorija } from 'src/app/store/kategorije.selector';

@Component({
  selector: 'app-kategorija-editor',
  templateUrl: './kategorija-editor.component.html',
  styleUrls: ['./kategorija-editor.component.css']
})
export class KategorijaEditorComponent implements OnInit {

  isEdit: boolean = false;
  kategorijaIdToEdit: number = -1;
  kategorijaToEdit$: Observable<Kategorija | undefined> = of(undefined);
  kategorijaToEditSubscription$: Subscription = new Subscription;

  value = '';

  kategorije$: Observable<Kategorija[]> = of([]);

  constructor(private route: ActivatedRoute, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(loadKategorije());
    this.kategorije$ = this.store.select(selectKategorijasList);

    const paramId = Number(this.route.snapshot.paramMap.get('id')) || -1;
    if (paramId !== -1) this.isEdit = true;
    else return;
    this.kategorijaIdToEdit = paramId;
    this.store.dispatch(selectKategorija({ kategorijaId: paramId }));
    console.log("paramId", paramId);

    this.kategorijaToEdit$ = this.store.select(selectSelectedKategorija);
    this.kategorijaToEditSubscription$ = this.kategorijaToEdit$.subscribe(x => {
      console.log("hererer kat", x);
      if (!x) {
        this.store.dispatch(loadSingleKategorija({ id: paramId }));
      }

      if (!x || !x.id || x.id !== this.kategorijaIdToEdit) return;
      this.value = x.name;
    });
  }

  ngOnDestroy() {
    this.kategorijaToEditSubscription$.unsubscribe();
  }

  reset() {
    this.value = '';
  }

  publish() {
    if (this.isEdit) {
      this.store.dispatch(editKategorija({
        id: this.kategorijaIdToEdit,
        name: this.value,
      }));
    } else {
      this.store.dispatch(publishKategorija({
        name: this.value,
      }));
    }
  }

}

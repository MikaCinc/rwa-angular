import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, of, Subscription, take, startWith, mergeWith } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { Kategorija } from 'src/app/models/kategorija';
import { editKategorija, loadKategorije, loadSingleKategorija, publishKategorija, selectKategorija } from 'src/app/store/kategorije.action';
import { selectKategorijasList, selectSelectedKategorija } from 'src/app/store/kategorije.selector';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-kategorija-editor',
  templateUrl: './kategorija-editor.component.html',
  styleUrls: ['./kategorija-editor.component.scss']
})
export class KategorijaEditorComponent implements OnInit {
  // For edit
  isEdit: boolean = false;
  selectedTab: number = 0;
  kategorijaIdToEdit: number = -1;
  kategorijaToEdit$: Observable<Kategorija | undefined> = of(undefined);
  kategorijaToEditSubscription$: Subscription = new Subscription;

  catCtrl = new FormControl('');
  filteredKategorije$: Observable<Kategorija[]> = of([]);
  // New name for category
  value = '';

  kategorije$: Observable<Kategorija[]> = of([]);
  allKategorije: Kategorija[] = [];
  @ViewChild('catInput')
  catInput!: ElementRef<HTMLInputElement>;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) { }

  private _filter(value: string | Kategorija): Kategorija[] {
    if (!value) return this.allKategorije;

    const name = typeof value === 'string' ? value : value.name;
    const filterValue = name.toLowerCase();

    return this.allKategorije.filter(cat => cat.name.toLowerCase().includes(filterValue));
  }

  ngOnInit(): void {
    this.store.dispatch(loadKategorije());
    this.kategorije$ = this.store.select(selectKategorijasList);
    this.kategorije$.pipe(take(2)).subscribe(x => {
      this.allKategorije = x;
    });

    const fromFilter$ = this.catCtrl.valueChanges.pipe(
      startWith(''),
      map((search: string) => {
        return search ? this._filter(search) : this.allKategorije.slice();
      }),
    );
    this.filteredKategorije$ = fromFilter$.pipe(mergeWith(this.kategorije$));

    // For edit pusrpose
    const paramId = Number(this.route.snapshot.paramMap.get('id')) || -1;
    console.log("paramId", paramId);

    this.kategorijaToEdit$ = this.store.select(selectSelectedKategorija);
    this.kategorijaToEditSubscription$ = this.kategorijaToEdit$.subscribe(x => {
      if (!x) {
        this.store.dispatch(loadSingleKategorija({ id: paramId }));
      }

      if (!x || !x.id || x.id !== this.kategorijaIdToEdit) return;
      this.value = x.name;
    });

    if (paramId === -1) return;

    this.isEdit = true;
    this.selectedTab = 1;
    this.kategorijaIdToEdit = paramId;
    this.store.dispatch(selectKategorija({ kategorijaId: paramId }));
  }

  ngOnDestroy() {
    this.kategorijaToEditSubscription$.unsubscribe();
  }

  reset() {
    this.value = '';
    this.catInput.nativeElement.value = '';
    this.catCtrl.setValue('');
    this.store.dispatch(selectKategorija({ kategorijaId: -1 }));
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (!event.option.value) return;
    const { value: selectedCategory } = event.option;

    this.kategorijaIdToEdit = selectedCategory.id;
    this.store.dispatch(selectKategorija({ kategorijaId: selectedCategory.id }));
    this.catCtrl.setValue('');
    this.catInput.nativeElement.value = '';
  }

  displayCategory(cat: Kategorija) {
    return cat ? cat.name : '';
  }

  selectedTabChange(event: number) {
    this.selectedTab = event;
    if (event === 0) {
      this.value = "";
      this.isEdit = false;
    } else if (event === 1) {
      this.isEdit = true;
    }
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

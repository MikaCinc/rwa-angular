import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Store } from '@ngrx/store';
import { map, Observable, of, Subscription, take, startWith, firstValueFrom } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { Kategorija } from 'src/app/models/kategorija';
import { editKategorija, loadKategorije, loadSingleKategorija, publishKategorija, selectKategorija } from 'src/app/store/kategorije.action';
import { selectKategorijasList, selectSelectedKategorija } from 'src/app/store/kategorije.selector';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-kategorija-editor',
  templateUrl: './kategorija-editor.component.html',
  styleUrls: ['./kategorija-editor.component.css']
})
export class KategorijaEditorComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  catCtrl = new FormControl('');
  filteredKategorije$: Observable<Kategorija[]> = of([]);

  isEdit: boolean = false;
  kategorijaIdToEdit: number = -1;
  kategorijaToEdit$: Observable<Kategorija | undefined> = of(undefined);
  kategorijaToEditSubscription$: Subscription = new Subscription;

  value = '';

  kategorije$: Observable<Kategorija[]> = of([]);
  allKategorije: Kategorija[] = [];
  @ViewChild('catInput')
  catInput!: ElementRef<HTMLInputElement>;

  selectedTab: number = 0;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {
    this.filteredKategorije$ = this.catCtrl.valueChanges.pipe(
      startWith(null),
      map((cat: string | null) => (cat ? this._filter(cat) : this.allKategorije.slice())),
    );
  }

  private _filter(value: string): Kategorija[] {
    console.log("filter", value, this.allKategorije);
    
    const filterValue = value.toLowerCase();

    return this.allKategorije.filter(cat => cat.name.toLowerCase().includes(filterValue));
  }

  ngOnInit(): void {
    this.store.dispatch(loadKategorije());
    this.kategorije$ = this.store.select(selectKategorijasList);
    this.kategorije$.pipe(take(1)).subscribe(x => {
      this.allKategorije = x;
      this.filteredKategorije$
    }).unsubscribe();

    const paramId = Number(this.route.snapshot.paramMap.get('id')) || -1;
    console.log("paramId", paramId);

    this.kategorijaToEdit$ = this.store.select(selectSelectedKategorija);
    this.kategorijaToEditSubscription$ = this.kategorijaToEdit$.subscribe(x => {
      console.log("hererer kat", x);
      if (!x) {
        this.store.dispatch(loadSingleKategorija({ id: paramId }));
      }

      console.log(x?.id, x?.name, this.kategorijaIdToEdit);

      if (!x || !x.id || x.id !== this.kategorijaIdToEdit) return;
      this.value = x.name;
    });

    if (paramId === -1) return

    this.isEdit = true;
    this.selectedTab = 1;
    this.kategorijaIdToEdit = paramId;
    this.store.dispatch(selectKategorija({ kategorijaId: paramId }));
    console.log("paramId", paramId);

  }

  ngOnDestroy() {
    this.kategorijaToEditSubscription$.unsubscribe();
  }

  reset() {
    this.value = '';
  }

  izbor(event: MatChipInputEvent) {
    console.log("izbor", event.value);

    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      // this.fruits.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.catCtrl.setValue(null);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (!event.option.value) return;
    console.log("selected", event.option.value);

    this.kategorijaIdToEdit = event.option.value;
    this.store.dispatch(selectKategorija({ kategorijaId: event.option.value }));
    this.kategorijaToEdit$ = this.store.select(selectSelectedKategorija);
    this.catInput.nativeElement.value = '';
    this.catCtrl.setValue(null);
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

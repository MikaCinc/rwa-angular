import { Component, Inject, OnChanges, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, of, take } from 'rxjs';
import { Kategorija } from 'src/app/models/kategorija';
import { User } from 'src/app/models/user';
import { deleteCategory, loadKategorije, selectKategorija } from 'src/app/store/kategorije.action';
import { selectKategorijasList, selectSelectedKategorijaId } from 'src/app/store/kategorije.selector';
import { loadPitanjaByCategory } from 'src/app/store/pitanje.action';
import { selectUser } from 'src/app/store/user.selector';
import { AppState } from '../../app.state';

@Component({
  selector: 'app-kategorije',
  templateUrl: './kategorije.component.html',
  styleUrls: ['./kategorije.component.css']
})
export class KategorijeComponent implements OnInit, OnChanges {

  kategorije$: Observable<Kategorija[]> = of([]);
  selectedKategorijaId$: Observable<number> = of(0);
  user$: Observable<User | null> = of(null);

  constructor(private store: Store<AppState>, public dialog: MatDialog) { }

  title = 'Kategorije';

  ngOnInit(): void {
    this.store.dispatch(loadKategorije());
    this.kategorije$ = this.store.select(selectKategorijasList);
    this.selectedKategorijaId$ = this.store.select(selectSelectedKategorijaId);
    this.user$ = this.store.select(selectUser);
  }

  ngOnChanges() {
    console.log("ngOnChanges in component");
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

  getToken(): string {
    let token;

    this.store.pipe(take(1)).subscribe(s => token = s.user.accessToken);

    return token || "";
  }

  handleDelete(category: Kategorija) {
    if (!category.id) return;

    this.dialog.open(DeleteDialog, {
      restoreFocus: false,
      data: {
        category,
        token: this.getToken()
      },
    });
  }

}

export interface DeleteDialogData {
  category: Kategorija;
  token: string;
}

@Component({
  selector: 'dialog-from-menu-dialog',
  templateUrl: 'delete-dialog.html',
})
export class DeleteDialog {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DeleteDialogData,
    private store: Store<AppState>
  ) { }

  confirmedDelete() {
    const { category, token } = this.data;
    if (!category.id) return;

    this.store.dispatch(deleteCategory({ id: category.id, token }));
  }
}